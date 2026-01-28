import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      organization,
      email,
      phone,
      areaOfInterest,
      message,
    } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 },
      );
    }

    // Debug: Log SMTP config (remove in production)
    console.log("SMTP CONFIG", {
      host: process.env.BREVO_SMTP_HOST,
      port: process.env.BREVO_SMTP_PORT,
      user: process.env.BREVO_SMTP_USER,
      hasPass: !!process.env.BREVO_SMTP_PASS,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    // Verify SMTP connection BEFORE sending
    await transporter.verify();
    console.log("SMTP connection verified successfully");

    // Format area of interest
    const areaLabels: Record<string, string> = {
      hiring: "Hiring Talent",
      job: "Looking for Job",
      partnership: "Partnership",
      other: "Other",
    };
    const formattedInterest =
      areaLabels[areaOfInterest] || areaOfInterest || "-";

    // Send internal notification email
    const internalInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(90deg, #0000FF 0%, #000099 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0000FF; }
            .value { margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #00DDE2; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Talentifi-X Website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Organization</div>
                <div class="value">${organization || "-"}</div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${phone || "-"}</div>
              </div>
              <div class="field">
                <div class="label">Area of Interest</div>
                <div class="value">${formattedInterest}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${message.replace(
                  /\n/g,
                  "<br/>",
                )}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Internal email result:", internalInfo);

    // Hard failure if SMTP didn't accept mail
    if (!internalInfo.accepted || internalInfo.accepted.length === 0) {
      throw new Error("SMTP did not accept the internal notification email");
    }

    console.log("Internal email sent successfully to:", internalInfo.accepted);

    // Send auto-reply to user
    const replyInfo = await transporter.sendMail({
      from: `"${process.env.CONTACT_FROM_NAME}" <${process.env.CONTACT_FROM_EMAIL}>`,
      to: email,
      subject: "Thank you for contacting Talentifi-X",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(90deg, #0000FF 0%, #000099 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .highlight { color: #0000FF; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Talentifi-X</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for reaching out!</p>
            </div>
            <div class="content">
              <p>Dear <span class="highlight">${firstName}</span>,</p>
              <p>Thank you for contacting Talentifi-X. We have received your message and appreciate you taking the time to reach out to us.</p>
              <p>Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 business hours.</p>
              <p>If you have any urgent questions, please don't hesitate to reach us at <a href="mailto:contact@talentifi-x.com">contact@talentifi-x.com</a>.</p>
              <p>Best regards,<br><span class="highlight">The Talentifi-X Team</span></p>
            </div>
            <div class="footer">
              <p>26/19 Gandhi Bazar Main Road, Basavanagudi, Bangalore 560004</p>
              <p>© ${new Date().getFullYear()} Talentifi-X. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Auto-reply result:", replyInfo);

    if (!replyInfo.accepted || replyInfo.accepted.length === 0) {
      throw new Error("SMTP did not accept the auto-reply email");
    }

    console.log("Auto-reply sent successfully to:", replyInfo.accepted);

    return NextResponse.json(
      {
        message:
          "Your message has been sent successfully. We will get back to you soon!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("SMTP error:", error);

    // Log detailed error info
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error:
          "We could not send your message at the moment. Please try again later.",
      },
      { status: 500 },
    );
  }
}
