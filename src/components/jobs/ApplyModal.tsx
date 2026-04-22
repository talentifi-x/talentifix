"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Loader2,
  X as CloseIcon,
  XCircle,
} from "lucide-react";
import { PhoneInput } from "react-international-phone";
import { useToast } from "@providers/toast";

type FormStatus = "idle" | "loading" | "success" | "error";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  jobSlug: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^https?:\/\/.+\..+/i;

const EXPERIENCE_OPTIONS = [
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-9", label: "6-9 years" },
  { value: "10-15", label: "10-15 years" },
  { value: "15+", label: "15+ years" },
];

export function ApplyModal({
  open,
  onClose,
  jobTitle,
  jobSlug,
}: ApplyModalProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  // Lock body scroll while open + close on Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  function resetForm() {
    setFullName("");
    setEmail("");
    setCountryCode("+91");
    setPhoneNumber("");
    setLocation("");
    setCurrentRole("");
    setYearsExperience("");
    setLinkedInUrl("");
    setPortfolioUrl("");
    setCoverNote("");
    setResumeUrl("");
    setStatus("idle");
    setErrorMessage("");
  }

  function handleClose() {
    if (status === "loading") return;
    resetForm();
    onClose();
  }

  function validate(): string | null {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.trim() || !EMAIL_RE.test(email))
      return "Please enter a valid email.";
    if (!phoneNumber.trim()) return "Please enter your phone number.";
    if (!location.trim()) return "Please enter your current location.";
    if (!currentRole.trim()) return "Please enter your current role.";
    if (!yearsExperience) return "Please select your years of experience.";
    if (!linkedInUrl.trim()) return "Please provide your LinkedIn URL.";
    if (!coverNote.trim())
      return "Please add a brief note on why this role is a fit.";
    if (!resumeUrl.trim()) return "Please paste your resume/CV link.";
    if (!URL_RE.test(resumeUrl.trim()))
      return "Please enter a valid URL (starting with http:// or https://).";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrorMessage(err);
      return;
    }
    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await fetch("/api/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          jobSlug,
          fullName: fullName.trim(),
          email: email.trim(),
          countryCode,
          phoneNumber: phoneNumber.trim(),
          location: location.trim(),
          currentRole: currentRole.trim(),
          yearsExperience,
          linkedInUrl: linkedInUrl.trim(),
          portfolioUrl: portfolioUrl.trim(),
          coverNote: coverNote.trim(),
          resumeUrl: resumeUrl.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Submission failed");
      }

      setStatus("success");
      toast({
        title: "Application submitted",
        description:
          data?.message ||
          "Thanks — we'll reach out if your profile is a strong match.",
        variant: "success",
      });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "We could not submit your application. Please try again.";
      setStatus("error");
      setErrorMessage(msg);
      toast({
        title: "Submission failed",
        description: msg,
        variant: "error",
      });
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[10px] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-6 pb-4 border-b border-gray-100">
          <div>
            <p className="text-primary font-notch font-bold text-xs tracking-widest uppercase">
              Apply
            </p>
            <h2
              id="apply-modal-title"
              className="text-[22px] md:text-[26px] font-bold font-notch text-dark leading-tight mt-1"
            >
              {jobTitle}
              <span className="text-secondary">.</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={status === "loading"}
            aria-label="Close"
            className="shrink-0 p-2 rounded-sm text-dark/60 hover:text-dark hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {status === "success" ? (
          <div className="px-6 md:px-8 py-12 flex flex-col items-center text-center gap-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-[22px] font-bold font-notch text-dark">
              Application Sent
              <span className="text-secondary">.</span>
            </h3>
            <p className="text-dark/70 font-sans text-base max-w-md">
              Thanks for applying. Our team reviews every application — if your
              profile is a strong match, we&apos;ll reach out within 5 business
              days.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 bg-primary hover:bg-primary/90 text-white font-bold font-notch text-sm uppercase tracking-wider px-6 py-3 rounded-sm transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-5"
          >
            <Field label="Full Name" required>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={status === "loading"}
                className={inputClass}
                placeholder="Your full name"
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Email" required>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </Field>

              <Field label="Phone Number" required>
                <PhoneInput
                  defaultCountry="in"
                  value={phoneNumber ? `${countryCode}${phoneNumber}` : ""}
                  onChange={(phone, meta) => {
                    const dial = `+${meta.country.dialCode}`;
                    setCountryCode(dial);
                    setPhoneNumber(
                      phone.startsWith(dial) ? phone.slice(dial.length) : phone,
                    );
                  }}
                  disabled={status === "loading"}
                  inputClassName="!w-full !border-0 !text-base !py-2.5 !text-dark !bg-transparent focus:!outline-none"
                  countrySelectorStyleProps={{
                    buttonClassName:
                      "!border-0 !bg-transparent !pr-2 !h-auto",
                  }}
                  className="w-full border border-gray-200 rounded-sm px-3 py-1 bg-white focus-within:border-primary transition-colors"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Current Location" required>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={status === "loading"}
                  className={inputClass}
                  placeholder="e.g. Bengaluru, India"
                />
              </Field>

              <Field label="Current Role" required>
                <input
                  type="text"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  disabled={status === "loading"}
                  className={inputClass}
                  placeholder="Your current job title"
                />
              </Field>
            </div>

            <Field label="Years of Experience" required>
              <select
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                disabled={status === "loading"}
                className={`${inputClass} appearance-none bg-white`}
              >
                <option value="" disabled>
                  Select experience range
                </option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="LinkedIn Profile URL" required>
              <input
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                disabled={status === "loading"}
                className={inputClass}
                placeholder="https://linkedin.com/in/username"
              />
            </Field>

            <Field label="Portfolio / Work Link" optional>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                disabled={status === "loading"}
                className={inputClass}
                placeholder="https://your-portfolio.com"
              />
            </Field>

            <Field label="Why you're a fit for this role" required>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                disabled={status === "loading"}
                rows={4}
                className={`${inputClass} resize-y min-h-27.5`}
                placeholder="A brief note on why this role is the right fit for you."
              />
            </Field>

            <Field
              label="Resume / CV URL"
              required
              hint="Paste a shareable link (Google Drive, Dropbox, Notion, etc.). Make sure it's set to 'Anyone with the link can view'."
            >
              <input
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                disabled={status === "loading"}
                className={inputClass}
                placeholder="https://drive.google.com/..."
              />
            </Field>

            {errorMessage && (
              <div className="flex items-start gap-2 text-sm text-red-600 font-sans bg-red-50 border border-red-200 rounded-sm px-3 py-2">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={status === "loading"}
                className="px-5 py-3 rounded-sm font-bold font-notch text-sm uppercase tracking-wider text-dark/60 hover:text-dark transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold font-notch text-sm uppercase tracking-wider px-6 py-3 rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-base font-sans text-dark placeholder:text-dark/40 focus:outline-none focus:border-primary transition-colors disabled:bg-gray-50";

function Field({
  label,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-bold font-notch text-dark/80 uppercase tracking-wider">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
        {optional && (
          <span className="text-dark/40 font-normal normal-case tracking-normal ml-2">
            (optional)
          </span>
        )}
      </span>
      {children}
      {hint && (
        <span className="text-xs font-sans text-dark/50 normal-case tracking-normal font-normal">
          {hint}
        </span>
      )}
    </label>
  );
}
