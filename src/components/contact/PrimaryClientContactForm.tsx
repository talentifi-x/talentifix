"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, CheckCircle, ChevronDown, Loader2, XCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";

type FormStatus = "idle" | "loading" | "success" | "error";

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

interface FormData {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  role: RoleValue | "";
  otherRole: string;
  timeline: TimelineValue | "";
  notes: string;
  allowPersonalEmail: boolean;
}

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

const ROLE_OPTIONS: Array<{ value: RoleValue; label: string }> = [
  { value: "ml-engineer", label: "Machine Learning Engineer" },
  { value: "ml-research-scientist", label: "AI/ML Research Scientist" },
  { value: "data-scientist-ml", label: "Data Scientist (ML Focus)" },
  { value: "cybersecurity-engineer", label: "Cybersecurity Engineer" },
  { value: "security-architect", label: "Security Architect" },
  { value: "penetration-tester", label: "Penetration Tester / Ethical Hacker" },
  { value: "cloud-security-specialist", label: "Cloud Security Specialist" },
  { value: "other", label: "Other Technical Role (Please specify)" },
];

const TIMELINE_OPTIONS: Array<{ value: TimelineValue; label: string; hint: string }> = [
  { value: "urgent", label: "⚡ Urgent", hint: "Need to hire within 2–4 weeks" },
  { value: "active", label: "🎯 Active", hint: "Hiring in next 1–2 months" },
  { value: "planning", label: "📋 Planning", hint: "Exploring for future needs" },
];

export const PrimaryClientContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    role: "",
    otherRole: "",
    timeline: "",
    notes: "",
    allowPersonalEmail: false,
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const emailBlocked = useMemo(() => {
    if (!formData.email) return false;
    if (formData.allowPersonalEmail) return false;
    return isFreeEmail(formData.email);
  }, [formData.email, formData.allowPersonalEmail]);

  const roleLabel = useMemo(() => {
    const option = ROLE_OPTIONS.find((r) => r.value === formData.role);
    if (formData.role === "other" && formData.otherRole.trim()) return formData.otherRole.trim();
    return option?.label ?? "";
  }, [formData.role, formData.otherRole]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimelineChange = (value: TimelineValue) => {
    setFormData((prev) => ({ ...prev, timeline: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailBlocked) {
      setStatus("error");
      setResponseMessage("Please use a work email (or check ‘I’m using a personal email’).");
      return;
    }

    if (formData.role === "other" && !formData.otherRole.trim()) {
      setStatus("error");
      setResponseMessage("Please specify the role you’re looking to fill.");
      return;
    }

    setStatus("loading");
    setResponseMessage("");

    try {
      const response = await fetch("/api/primary-client-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          roleLabel,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setResponseMessage(data.message);
        setFormData({
          name: "",
          email: "",
          companyName: "",
          phoneNumber: "",
          role: "",
          otherRole: "",
          timeline: "",
          notes: "",
          allowPersonalEmail: false,
        });
      } else {
        setStatus("error");
        setResponseMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMessage("Failed to send message. Please check your connection and try again.");
    }
  };

  return (
    <section className="w-full bg-[#F2F4F8] py-16 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-[40px] font-bold font-notch text-[#1E1E24]">
            Let&apos;s Discuss Your Hiring Needs<span className="text-[#00DDE2]">.</span>
          </h2>
          <p className="text-lg text-[#1E1E24] opacity-60 font-medium max-w-2xl">
            Low friction, fast response. Share a few details and we&apos;ll get back within 4
            business hours — usually faster.
          </p>
        </div>

        {status === "success" && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Message Sent Successfully!</p>
              <p className="text-green-700 text-sm mt-1">{responseMessage}</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
            <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Couldn&apos;t Send Your Message</p>
              <p className="text-red-700 text-sm mt-1">{responseMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg font-medium text-[#1E1E24]">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-medium text-[#1E1E24]">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@company.com"
              className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
            />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <label className="flex items-center gap-2 text-sm text-[#1E1E24]/70">
                <input
                  type="checkbox"
                  name="allowPersonalEmail"
                  checked={formData.allowPersonalEmail}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#0000FF]"
                />
                I&apos;m using a personal email
              </label>
              {emailBlocked && (
                <p className="text-sm text-red-700">
                  Please use a work email (or allow a personal email).
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className="text-lg font-medium text-[#1E1E24]">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Your company"
              autoComplete="organization"
              className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-[#1E1E24]">Phone Number</label>
            <PhoneInput
              defaultCountry="in"
              value={formData.phoneNumber}
              onChange={(phone) => setFormData((prev) => ({ ...prev, phoneNumber: phone }))}
              inputClassName="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              className="w-full"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-lg font-medium text-[#1E1E24]">
              What role are you looking to fill? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0000FF] cursor-pointer"
              >
                <option value="">Select a role</option>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-6 h-6 text-[#0000FF]" />
              </div>
            </div>
            {formData.role === "other" && (
              <input
                type="text"
                id="otherRole"
                name="otherRole"
                value={formData.otherRole}
                onChange={handleChange}
                required
                placeholder="Please specify the role"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-lg font-medium text-[#1E1E24]">
              What&apos;s your timeline? <span className="text-red-500">*</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TIMELINE_OPTIONS.map((option) => {
                const selected = formData.timeline === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleTimelineChange(option.value)}
                    className={[
                      "text-left border rounded-[10px] p-4 transition-colors",
                      selected
                        ? "border-[#0000FF] bg-white"
                        : "border-[#1E1E24] bg-[#F2F4F8] hover:bg-white",
                    ].join(" ")}
                  >
                    <div className="font-bold text-[#1E1E24]">{option.label}</div>
                    <div className="text-sm text-[#1E1E24]/70 mt-1">{option.hint}</div>
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="timeline" value={formData.timeline} required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="text-lg font-medium text-[#1E1E24]">
              Anything else we should know?
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="E.g., Previous staffing challenges, specific skills required, cultural priorities..."
              className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF] resize-none"
            />
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 bg-[#0000FF] hover:bg-[#000099] disabled:bg-[#0000FF]/50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-[5px] font-bold text-lg transition-colors w-full md:w-fit"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  Start the Conversation <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-sm text-[#1E1E24]/60">
              We&apos;ll respond within 4 hours during business hours. Usually faster.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
