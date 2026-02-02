import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type TimelineValue = "urgent" | "active" | "planning";

type RoleValue =
  | "ml-engineer"
  | "ml-research-scientist"
  | "data-scientist-ml"
  | "cybersecurity-engineer"
  | "security-architect"
  | "penetration-tester"
  | "cloud-security-specialist"
  | "other";

const ROLE_LABELS: Record<RoleValue, string> = {
  "ml-engineer": "Machine Learning Engineer",
  "ml-research-scientist": "AI/ML Research Scientist",
  "data-scientist-ml": "Data Scientist (ML Focus)",
  "cybersecurity-engineer": "Cybersecurity Engineer",
  "security-architect": "Security Architect",
  "penetration-tester": "Penetration Tester / Ethical Hacker",
  "cloud-security-specialist": "Cloud Security Specialist",
  other: "Other Technical Role",
};

const TIMELINE_LABELS: Record<TimelineValue, string> = {
  urgent: "Urgent (Need to hire within 2–4 weeks)",
  active: "Active (Hiring in next 1–2 months)",
  planning: "Planning (Exploring for future needs)",
};

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
]);

function getEmailDomain(email: string) {
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) return "";
  return email.slice(atIndex + 1).trim().toLowerCase();
}

function isFreeEmail(email: string) {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return FREE_EMAIL_DOMAINS.has(domain);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const companyName = String(body?.companyName ?? "").trim();
    const countryCode = String(body?.countryCode ?? "").trim();
    const phoneNumber = String(body?.phoneNumber ?? "").trim();
    const role = String(body?.role ?? "").trim() as RoleValue | "";
    const otherRole = String(body?.otherRole ?? "").trim();
    const timeline = String(body?.timeline ?? "").trim() as TimelineValue | "";
    const notes = String(body?.notes ?? "").trim();
    const allowPersonalEmail = Boolean(body?.allowPersonalEmail ?? false);

    if (!name || !email || !companyName || !role || !timeline) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }

    if (role === "other" && !otherRole) {
      return NextResponse.json({ error: "Please specify the role" }, { status: 400 });
    }

    const roleLabel = role === "other" ? otherRole : ROLE_LABELS[role];
    const timelineLabel = TIMELINE_LABELS[timeline as TimelineValue];

    if (!allowPersonalEmail && isFreeEmail(email)) {
      return NextResponse.json(
        { error: "Please use a work email (or allow a personal email)." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    await transporter.verify();

    const phoneValue = phoneNumber ? `${countryCode || ""} ${phoneNumber}`.trim() : "-";

    const internalInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Start Hiring Lead: ${roleLabel}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 640px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(90deg, #0000FF 0%, #000099 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .row { margin-bottom: 14px; }
              .label { font-weight: bold; color: #0000FF; }
              .value { margin-top: 4px; }
              .notes { background: white; padding: 14px; border-left: 4px solid #00DDE2; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">Primary Client Contact Form</h2>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">Start Hiring CTA</p>
              </div>
              <div class="content">
                <div class="row">
                  <div class="label">Name</div>
                  <div class="value">${escapeHtml(name)}</div>
                </div>
                <div class="row">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
                </div>
                <div class="row">
                  <div class="label">Company</div>
                  <div class="value">${escapeHtml(companyName)}</div>
                </div>
                <div class="row">
                  <div class="label">Phone</div>
                  <div class="value">${escapeHtml(phoneValue)}</div>
                </div>
                <div class="row">
                  <div class="label">Role</div>
                  <div class="value">${escapeHtml(roleLabel)}</div>
                </div>
                <div class="row">
                  <div class="label">Timeline</div>
                  <div class="value">${escapeHtml(timelineLabel)}</div>
                </div>
                <div class="row">
                  <div class="label">Notes</div>
                  <div class="value">
                    <div class="notes">${escapeHtml(notes || "-").replaceAll("\n", "<br/>")}</div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (!internalInfo.accepted || internalInfo.accepted.length === 0) {
      throw new Error("SMTP did not accept the internal notification email");
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://talentifi-x.com").replace(/\/$/, "");
    const helpfulLink = `${siteUrl}/blog`;
    const contactPhone = process.env.CONTACT_PHONE ? String(process.env.CONTACT_PHONE) : "";

    const replyInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: email,
      subject: `Got it - Let's talk about your ${roleLabel} hire`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #1E1E24; }
              .container { max-width: 640px; margin: 0 auto; padding: 20px; }
              .card { background: #ffffff; border: 1px solid #e6e6ef; border-radius: 10px; overflow: hidden; }
              .header { background: linear-gradient(90deg, #0000FF 0%, #000099 100%); color: white; padding: 22px; }
              .content { padding: 22px; background: #f9f9f9; }
              .muted { color: rgba(30, 30, 36, 0.75); }
              .bullet { margin: 10px 0 0 0; padding-left: 18px; }
              .footer { padding: 18px 22px; background: #ffffff; border-top: 1px solid #e6e6ef; }
              a { color: #0000FF; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <h2 style="margin: 0;">Talentifi-X</h2>
                  <p style="margin: 8px 0 0 0; opacity: 0.9;">Thanks for reaching out</p>
                </div>
                <div class="content">
                  <p>Hi ${escapeHtml(name)},</p>
                  <p>Thanks for reaching out about your ${escapeHtml(roleLabel)} search.</p>
                  <p>I&apos;m Chet, founder of Talentifi-X. I&apos;ve personally read your message and will respond within the next <strong>4 hours</strong> with:</p>
                  <ul class="bullet">
                    <li>Initial thoughts on your search</li>
                    <li>Our approach for this role</li>
                    <li>Timeline and next steps</li>
                  </ul>
                  <p class="muted" style="margin-top: 16px;">In the meantime, you might find this helpful: <a href="${escapeHtml(helpfulLink)}">Read recent insights</a></p>
                  <p style="margin-top: 18px;">Talk soon,<br/>Chet</p>
                  ${
                    contactPhone
                      ? `<p class="muted">P.S. Need to talk urgently? Call me directly: ${escapeHtml(contactPhone)}</p>`
                      : ""
                  }
                </div>
                <div class="footer">
                  <p class="muted" style="margin: 0;">We&apos;ll respond within 4 hours during business hours. Usually faster.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (!replyInfo.accepted || replyInfo.accepted.length === 0) {
      throw new Error("SMTP did not accept the auto-reply email");
    }

    return NextResponse.json(
      { message: "Thanks — we’ve received your details and will respond shortly." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "We could not send your message at the moment. Please try again later." },
      { status: 500 },
    );
  }
}

