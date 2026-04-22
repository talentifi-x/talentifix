import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^https?:\/\/.+\..+/i;

const EXPERIENCE_LABELS: Record<string, string> = {
  "0-2": "0-2 years",
  "3-5": "3-5 years",
  "6-9": "6-9 years",
  "10-15": "10-15 years",
  "15+": "15+ years",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const jobTitle = asString(body.jobTitle);
    const jobSlug = asString(body.jobSlug);
    const fullName = asString(body.fullName);
    const email = asString(body.email);
    const countryCode = asString(body.countryCode);
    const phoneNumber = asString(body.phoneNumber);
    const location = asString(body.location);
    const currentRole = asString(body.currentRole);
    const yearsExperience = asString(body.yearsExperience);
    const linkedInUrl = normalizeUrl(asString(body.linkedInUrl));
    const portfolioUrl = normalizeUrl(asString(body.portfolioUrl));
    const coverNote = asString(body.coverNote);
    const resumeUrl = normalizeUrl(asString(body.resumeUrl));

    if (
      !jobTitle ||
      !fullName ||
      !email ||
      !phoneNumber ||
      !location ||
      !currentRole ||
      !yearsExperience ||
      !linkedInUrl ||
      !coverNote ||
      !resumeUrl
    ) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    if (!URL_RE.test(resumeUrl)) {
      return NextResponse.json(
        { error: "Please enter a valid resume URL" },
        { status: 400 },
      );
    }

    const yearsLabel = EXPERIENCE_LABELS[yearsExperience] ?? yearsExperience;
    const phoneValue = `${countryCode} ${phoneNumber}`.trim();

    const careersTo =
      process.env.CAREERS_TO_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "careers@talentifi-x.com";

    const logoCid = "talentifi-logo";
    const logoPath = path.join(process.cwd(), "public", "logos", "logo.png");
    const logoAttachment = {
      filename: "logo.png",
      path: logoPath,
      cid: logoCid,
    };

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

    // Internal notification
    const internalInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: careersTo,
      replyTo: email,
      subject: `New Application: ${fullName} — ${jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 640px; margin: 0 auto; padding: 20px; }
              .header { background: #ffffff; color: #000000; padding: 20px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
              .row { margin-bottom: 14px; }
              .label { font-weight: bold; color: #0000FF; }
              .value { margin-top: 4px; }
              .box { background: white; padding: 14px; border-left: 4px solid #00DDE2; }
              .role-tag { display: inline-block; background: #0000FF; color: #ffffff; font-weight: bold; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; padding: 6px 10px; border-radius: 3px; }
              .cta { display: inline-block; background: #0000FF; color: #ffffff; font-weight: bold; text-decoration: none; padding: 10px 16px; border-radius: 3px; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0; color: #000000;">New Job Application</h2>
                <p style="margin: 8px 0 0 0;"><span class="role-tag">${escapeHtml(jobTitle)}</span></p>
              </div>
              <div class="content">
                <div class="row"><div class="label">Name</div><div class="value">${escapeHtml(fullName)}</div></div>
                <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div></div>
                <div class="row"><div class="label">Phone</div><div class="value">${escapeHtml(phoneValue)}</div></div>
                <div class="row"><div class="label">Location</div><div class="value">${escapeHtml(location)}</div></div>
                <div class="row"><div class="label">Current Role</div><div class="value">${escapeHtml(currentRole)}</div></div>
                <div class="row"><div class="label">Experience</div><div class="value">${escapeHtml(yearsLabel)}</div></div>
                <div class="row"><div class="label">LinkedIn</div><div class="value"><a href="${escapeHtml(linkedInUrl)}">${escapeHtml(linkedInUrl)}</a></div></div>
                <div class="row"><div class="label">Portfolio</div><div class="value">${
                  portfolioUrl
                    ? `<a href="${escapeHtml(portfolioUrl)}">${escapeHtml(portfolioUrl)}</a>`
                    : "-"
                }</div></div>
                <div class="row">
                  <div class="label">Resume / CV</div>
                  <div class="value">
                    <a href="${escapeHtml(resumeUrl)}">${escapeHtml(resumeUrl)}</a>
                    <div style="margin-top: 10px;">
                      <a class="cta" href="${escapeHtml(resumeUrl)}">Open Resume</a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="label">Why they're a fit</div>
                  <div class="value"><div class="box">${escapeHtml(coverNote).replaceAll("\n", "<br/>")}</div></div>
                </div>
                ${
                  jobSlug
                    ? `<div class="row"><div class="label">Role</div><div class="value">/jobs/${escapeHtml(jobSlug)}</div></div>`
                    : ""
                }
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (!internalInfo.accepted || internalInfo.accepted.length === 0) {
      throw new Error("SMTP did not accept the internal notification email");
    }

    // Auto-reply to applicant
    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || "https://talentifix.com"
    ).replace(/\/$/, "");
    const privacyUrl = `${siteUrl}/privacy-policy`;

    const replyInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: email,
      subject: `We received your application — ${jobTitle}`,
      attachments: [logoAttachment],
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
              .role-tag { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(0,221,226,0.55); color: #ffffff; font-weight: bold; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; padding: 6px 10px; border-radius: 3px; margin-top: 10px; }
              a { color: #0000FF; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <div style="margin-bottom: 12px;">
                    <div style="background:#F2F4F8; display:inline-block; padding:12px 16px; border-radius:14px; line-height:0; border:1px solid rgba(0,221,226,0.55); box-shadow: 0 10px 24px rgba(0,0,0,0.18);">
                      <img src="cid:${logoCid}" alt="TalentiFi-X" height="38" style="display:block; height:38px; width:auto;" />
                    </div>
                  </div>
                  <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 18px; font-weight: bold;">Application received</p>
                  <span class="role-tag">${escapeHtml(jobTitle)}</span>
                </div>
                <div class="content">
                  <p>Hi ${escapeHtml(fullName)},</p>
                  <p>Thanks for applying to the <strong>${escapeHtml(jobTitle)}</strong> role at TalentiFi-X. Your application is with our team.</p>
                  <p class="muted">We review every application personally. If your profile is a strong match, our team will reach out within 5 business days.</p>
                  <p class="muted">In the meantime, feel free to learn more about us at <a href="${escapeHtml(siteUrl)}">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a>.</p>
                  <p class="muted" style="margin-top: 22px;">— TalentiFi-X · Human Led · AI Assisted</p>
                  <p class="muted" style="font-size: 12px;">Privacy policy: <a href="${escapeHtml(privacyUrl)}">${escapeHtml(privacyUrl)}</a></p>
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
      {
        message:
          "Thanks — your application is in. We'll reach out if there's a match.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "We could not submit your application at the moment. Please try again later.",
      },
      { status: 500 },
    );
  }
}
