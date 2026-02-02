import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type LocationValue =
  | "bangalore"
  | "hyderabad"
  | "pune"
  | "delhi-ncr"
  | "mumbai"
  | "chennai"
  | "remote-india"
  | "other";

type ExpertiseValue =
  | "ml-ai-engineering"
  | "data-science-ml-ai"
  | "cybersecurity-info-sec"
  | "cloud-security"
  | "other";

type ExperienceValue = "0-2" | "3-5" | "6-9" | "10-15" | "15+";

type EmploymentStatusValue =
  | "employed-open"
  | "employed-looking"
  | "between-jobs"
  | "freelance-open"
  | "student-grad";

type RoleTypeValue = "permanent" | "contract" | "contract-to-hire" | "freelance";

type WorkArrangementValue = "remote" | "hybrid" | "onsite" | "flexible";

type SalaryValue =
  | "10-15"
  | "15-20"
  | "20-30"
  | "30-50"
  | "50+"
  | "prefer-not";

type StartTimeValue =
  | "immediately"
  | "2-weeks"
  | "1-month"
  | "2-months"
  | "3-plus"
  | "exploring";

type HeardFromValue =
  | "linkedin"
  | "google"
  | "referral"
  | "job-board"
  | "event"
  | "other";

const LOCATION_LABELS: Record<LocationValue, string> = {
  bangalore: "Bangalore",
  hyderabad: "Hyderabad",
  pune: "Pune",
  "delhi-ncr": "Delhi-NCR",
  mumbai: "Mumbai",
  chennai: "Chennai",
  "remote-india": "Remote (anywhere in India)",
  other: "Other",
};

const EXPERTISE_LABELS: Record<ExpertiseValue, string> = {
  "ml-ai-engineering": "Machine Learning / AI Engineering",
  "data-science-ml-ai": "Data Science (ML/AI focus)",
  "cybersecurity-info-sec": "Cybersecurity / Information Security",
  "cloud-security": "Cloud Security",
  other: "Other Technical Role",
};

const EXPERIENCE_LABELS: Record<ExperienceValue, string> = {
  "0-2": "0-2 years",
  "3-5": "3-5 years",
  "6-9": "6-9 years",
  "10-15": "10-15 years",
  "15+": "15+ years",
};

const EMPLOYMENT_LABELS: Record<EmploymentStatusValue, string> = {
  "employed-open": "Employed, open to opportunities",
  "employed-looking": "Employed, actively looking",
  "between-jobs": "Between jobs, available immediately",
  "freelance-open": "Freelance/Contract, open to permanent",
  "student-grad": "Student/Recent graduate",
};

const ROLE_TYPE_LABELS: Record<RoleTypeValue, string> = {
  permanent: "Permanent / Full-time",
  contract: "Contract (3-12 months)",
  "contract-to-hire": "Contract-to-Hire",
  freelance: "Freelance/Project-based",
};

const WORK_ARRANGEMENT_LABELS: Record<WorkArrangementValue, string> = {
  remote: "Remote only",
  hybrid: "Hybrid (2-3 days in office)",
  onsite: "On-site preferred",
  flexible: "Flexible / Open to discussion",
};

const SALARY_LABELS: Record<SalaryValue, string> = {
  "10-15": "₹10-15 Lakhs",
  "15-20": "₹15-20 Lakhs",
  "20-30": "₹20-30 Lakhs",
  "30-50": "₹30-50 Lakhs",
  "50+": "₹50+ Lakhs",
  "prefer-not": "Prefer not to say",
};

const START_TIME_LABELS: Record<StartTimeValue, string> = {
  immediately: "Immediately",
  "2-weeks": "Within 2 weeks",
  "1-month": "1 month notice period",
  "2-months": "2 months notice period",
  "3-plus": "3+ months",
  exploring: "Just exploring, not actively looking",
};

const HEARD_FROM_LABELS: Record<HeardFromValue, string> = {
  linkedin: "LinkedIn",
  google: "Google Search",
  referral: "Referral from friend/colleague",
  "job-board": "Job board",
  event: "Conference/Event",
  other: "Other",
};

const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_FILE_BYTES = 5 * 1024 * 1024;

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

function safeString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function safeBool(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes" || value === "on";
}

function safeJsonArray<T>(value: string): T[] | null {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;
    return parsed as T[];
  } catch {
    return null;
  }
}

function fileExtension(fileName: string) {
  const parts = fileName.split(".");
  if (parts.length < 2) return "";
  return parts[parts.length - 1].toLowerCase();
}

function inferMimeType(fileName: string) {
  const ext = fileExtension(fileName);
  if (ext === "pdf") return "application/pdf";
  if (ext === "doc") return "application/msword";
  if (ext === "docx") return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const fullName = safeString(form, "fullName");
    const email = safeString(form, "email");
    const countryCode = safeString(form, "countryCode");
    const phoneNumber = safeString(form, "phoneNumber");
    const location = safeString(form, "location") as LocationValue | "";
    const otherLocation = safeString(form, "otherLocation");
    const linkedInUrl = normalizeUrl(safeString(form, "linkedInUrl"));

    const expertise = safeString(form, "expertise") as ExpertiseValue | "";
    const otherExpertise = safeString(form, "otherExpertise");
    const yearsExperience = safeString(form, "yearsExperience") as ExperienceValue | "";
    const employmentStatus = safeString(form, "employmentStatus") as EmploymentStatusValue | "";
    const topSkills = safeString(form, "topSkills");
    const jobTitle = safeString(form, "jobTitle");
    const company = safeString(form, "company");

    const roleTypesRaw = safeString(form, "roleTypes");
    const roleTypesParsed = safeJsonArray<RoleTypeValue>(roleTypesRaw) ?? [];

    const workArrangement = safeString(form, "workArrangement") as WorkArrangementValue | "";
    const salaryRange = safeString(form, "salaryRange") as SalaryValue | "";
    const startTime = safeString(form, "startTime") as StartTimeValue | "";

    const githubUrl = normalizeUrl(safeString(form, "githubUrl"));
    const portfolioUrl = normalizeUrl(safeString(form, "portfolioUrl"));
    const targets = safeString(form, "targets");

    const heardFrom = safeString(form, "heardFrom") as HeardFromValue | "";
    const otherHeardFrom = safeString(form, "otherHeardFrom");
    const privacyConsent = safeBool(form, "privacyConsent");

    const resume = form.get("resume");

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !location ||
      !expertise ||
      !yearsExperience ||
      !employmentStatus ||
      !topSkills ||
      !jobTitle ||
      roleTypesParsed.length === 0 ||
      !workArrangement ||
      !salaryRange ||
      !startTime ||
      !privacyConsent ||
      !heardFrom
    ) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }

    if (location === "other" && !otherLocation) {
      return NextResponse.json({ error: "Please enter your location" }, { status: 400 });
    }

    if (expertise === "other" && !otherExpertise) {
      return NextResponse.json({ error: "Please specify your expertise" }, { status: 400 });
    }

    if (heardFrom === "other" && !otherHeardFrom) {
      return NextResponse.json({ error: "Please specify how you heard about us" }, { status: 400 });
    }

    if (!(resume instanceof File)) {
      return NextResponse.json({ error: "Please upload your resume/CV" }, { status: 400 });
    }

    if (resume.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "Resume file must be 5MB or smaller" }, { status: 400 });
    }

    const resumeType = resume.type || inferMimeType(resume.name);
    if (resumeType && !ACCEPTED_MIME_TYPES.has(resumeType)) {
      return NextResponse.json({ error: "Only PDF, DOC, or DOCX files are allowed" }, { status: 400 });
    }

    const roleTypesLabels = roleTypesParsed
      .map((t) => ROLE_TYPE_LABELS[t])
      .filter(Boolean)
      .join(", ");

    const locationLabel =
      location === "other" ? otherLocation : LOCATION_LABELS[location as LocationValue] ?? location;

    const expertiseLabel =
      expertise === "other"
        ? otherExpertise
        : EXPERTISE_LABELS[expertise as ExpertiseValue] ?? expertise;

    const yearsLabel = EXPERIENCE_LABELS[yearsExperience as ExperienceValue] ?? yearsExperience;
    const employmentLabel =
      EMPLOYMENT_LABELS[employmentStatus as EmploymentStatusValue] ?? employmentStatus;
    const workArrangementLabel =
      WORK_ARRANGEMENT_LABELS[workArrangement as WorkArrangementValue] ?? workArrangement;
    const salaryLabel = SALARY_LABELS[salaryRange as SalaryValue] ?? salaryRange;
    const startTimeLabel = START_TIME_LABELS[startTime as StartTimeValue] ?? startTime;
    const heardFromLabel =
      heardFrom === "other" ? otherHeardFrom : HEARD_FROM_LABELS[heardFrom as HeardFromValue] ?? heardFrom;

    const phoneValue = `${countryCode} ${phoneNumber}`.trim();

    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

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

    const internalInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Candidate: ${fullName} — ${expertiseLabel}`,
      attachments: [
        {
          filename: resume.name || `resume.${fileExtension(resume.name) || "pdf"}`,
          content: resumeBuffer,
          contentType: resumeType || undefined,
        },
      ],
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
              .box { background: white; padding: 14px; border-left: 4px solid #00DDE2; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">Candidate Registration</h2>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">Join Our Network</p>
              </div>
              <div class="content">
                <div class="row"><div class="label">Name</div><div class="value">${escapeHtml(fullName)}</div></div>
                <div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div></div>
                <div class="row"><div class="label">Phone</div><div class="value">${escapeHtml(phoneValue)}</div></div>
                <div class="row"><div class="label">Location</div><div class="value">${escapeHtml(locationLabel)}</div></div>
                <div class="row"><div class="label">LinkedIn</div><div class="value">${linkedInUrl ? `<a href="${escapeHtml(linkedInUrl)}">${escapeHtml(linkedInUrl)}</a>` : "-"}</div></div>

                <div class="row"><div class="label">Expertise</div><div class="value">${escapeHtml(expertiseLabel)}</div></div>
                <div class="row"><div class="label">Experience</div><div class="value">${escapeHtml(yearsLabel)}</div></div>
                <div class="row"><div class="label">Employment Status</div><div class="value">${escapeHtml(employmentLabel)}</div></div>
                <div class="row"><div class="label">Top Skills</div><div class="value">${escapeHtml(topSkills)}</div></div>
                <div class="row"><div class="label">Job Title</div><div class="value">${escapeHtml(jobTitle)}</div></div>
                <div class="row"><div class="label">Company</div><div class="value">${escapeHtml(company || "-")}</div></div>

                <div class="row"><div class="label">Role Type</div><div class="value">${escapeHtml(roleTypesLabels)}</div></div>
                <div class="row"><div class="label">Work Arrangement</div><div class="value">${escapeHtml(workArrangementLabel)}</div></div>
                <div class="row"><div class="label">Salary Range</div><div class="value">${escapeHtml(salaryLabel)}</div></div>
                <div class="row"><div class="label">Start Time</div><div class="value">${escapeHtml(startTimeLabel)}</div></div>

                <div class="row"><div class="label">GitHub</div><div class="value">${githubUrl ? `<a href="${escapeHtml(githubUrl)}">${escapeHtml(githubUrl)}</a>` : "-"}</div></div>
                <div class="row"><div class="label">Portfolio</div><div class="value">${portfolioUrl ? `<a href="${escapeHtml(portfolioUrl)}">${escapeHtml(portfolioUrl)}</a>` : "-"}</div></div>
                <div class="row">
                  <div class="label">Targets</div>
                  <div class="value"><div class="box">${escapeHtml(targets || "-").replaceAll("\n", "<br/>")}</div></div>
                </div>
                <div class="row"><div class="label">Heard From</div><div class="value">${escapeHtml(heardFromLabel)}</div></div>
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
    const privacyUrl = `${siteUrl}/privacy-policy`;

    const replyInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: email,
      subject: "Welcome to the Talentifix Network",
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
              a { color: #0000FF; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <h2 style="margin: 0;">Talentifix</h2>
                  <p style="margin: 8px 0 0 0; opacity: 0.9;">Thanks for joining our network</p>
                </div>
                <div class="content">
                  <p>Hi ${escapeHtml(fullName)},</p>
                  <p>Thanks for joining our talent network. We specialize in AI/ML and Cybersecurity roles, and we review every profile personally.</p>
                  <p class="muted">If we have a relevant opportunity, we&apos;ll reach out — usually within 48 hours.</p>
                  <p class="muted">Privacy policy: <a href="${escapeHtml(privacyUrl)}">${escapeHtml(privacyUrl)}</a></p>
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
      { message: "Thanks — your profile is in. We’ll reach out if there’s a relevant opportunity." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "We could not submit your profile at the moment. Please try again later." },
      { status: 500 },
    );
  }
}

