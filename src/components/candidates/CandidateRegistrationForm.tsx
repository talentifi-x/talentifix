"use client";

import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle, ChevronDown, Loader2, UploadCloud, XCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";

type FormStatus = "idle" | "loading" | "success" | "error";

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

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: LocationValue | "";
  otherLocation: string;
  linkedInUrl: string;
  expertise: ExpertiseValue | "";
  otherExpertise: string;
  yearsExperience: ExperienceValue | "";
  employmentStatus: EmploymentStatusValue | "";
  topSkills: string;
  jobTitle: string;
  company: string;
  roleTypes: RoleTypeValue[];
  workArrangement: WorkArrangementValue | "";
  salaryRange: SalaryValue | "";
  startTime: StartTimeValue | "";
  resumeFile: File | null;
  githubUrl: string;
  portfolioUrl: string;
  targets: string;
  heardFrom: HeardFromValue | "";
  otherHeardFrom: string;
  privacyConsent: boolean;
}

const LOCATION_OPTIONS: Array<{ value: LocationValue; label: string }> = [
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "pune", label: "Pune" },
  { value: "delhi-ncr", label: "Delhi-NCR" },
  { value: "mumbai", label: "Mumbai" },
  { value: "chennai", label: "Chennai" },
  { value: "remote-india", label: "Remote (anywhere in India)" },
  { value: "other", label: "Other" },
];

const EXPERTISE_OPTIONS: Array<{ value: ExpertiseValue; label: string }> = [
  { value: "ml-ai-engineering", label: "Machine Learning / AI Engineering" },
  { value: "data-science-ml-ai", label: "Data Science (ML/AI focus)" },
  { value: "cybersecurity-info-sec", label: "Cybersecurity / Information Security" },
  { value: "cloud-security", label: "Cloud Security" },
  { value: "other", label: "Other Technical Role" },
];

const EXPERIENCE_OPTIONS: Array<{ value: ExperienceValue; label: string }> = [
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-9", label: "6-9 years" },
  { value: "10-15", label: "10-15 years" },
  { value: "15+", label: "15+ years" },
];

const EMPLOYMENT_OPTIONS: Array<{ value: EmploymentStatusValue; label: string }> = [
  { value: "employed-open", label: "Employed, open to opportunities" },
  { value: "employed-looking", label: "Employed, actively looking" },
  { value: "between-jobs", label: "Between jobs, available immediately" },
  { value: "freelance-open", label: "Freelance/Contract, open to permanent" },
  { value: "student-grad", label: "Student/Recent graduate" },
];

const ROLE_TYPE_OPTIONS: Array<{ value: RoleTypeValue; label: string }> = [
  { value: "permanent", label: "Permanent / Full-time" },
  { value: "contract", label: "Contract (3-12 months)" },
  { value: "contract-to-hire", label: "Contract-to-Hire" },
  { value: "freelance", label: "Freelance/Project-based" },
];

const WORK_ARRANGEMENT_OPTIONS: Array<{ value: WorkArrangementValue; label: string }> = [
  { value: "remote", label: "Remote only" },
  { value: "hybrid", label: "Hybrid (2-3 days in office)" },
  { value: "onsite", label: "On-site preferred" },
  { value: "flexible", label: "Flexible / Open to discussion" },
];

const SALARY_OPTIONS: Array<{ value: SalaryValue; label: string }> = [
  { value: "10-15", label: "₹10-15 Lakhs" },
  { value: "15-20", label: "₹15-20 Lakhs" },
  { value: "20-30", label: "₹20-30 Lakhs" },
  { value: "30-50", label: "₹30-50 Lakhs" },
  { value: "50+", label: "₹50+ Lakhs" },
  { value: "prefer-not", label: "Prefer not to say" },
];

const START_TIME_OPTIONS: Array<{ value: StartTimeValue; label: string }> = [
  { value: "immediately", label: "Immediately" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "1-month", label: "1 month notice period" },
  { value: "2-months", label: "2 months notice period" },
  { value: "3-plus", label: "3+ months" },
  { value: "exploring", label: "Just exploring, not actively looking" },
];

const HEARD_FROM_OPTIONS: Array<{ value: HeardFromValue; label: string }> = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "google", label: "Google Search" },
  { value: "referral", label: "Referral from friend/colleague" },
  { value: "job-board", label: "Job board" },
  { value: "event", label: "Conference/Event" },
  { value: "other", label: "Other" },
];

const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_FILE_BYTES = 5 * 1024 * 1024;

export const CandidateRegistrationForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    otherLocation: "",
    linkedInUrl: "",
    expertise: "",
    otherExpertise: "",
    yearsExperience: "",
    employmentStatus: "",
    topSkills: "",
    jobTitle: "",
    company: "",
    roleTypes: [],
    workArrangement: "",
    salaryRange: "",
    startTime: "",
    resumeFile: null,
    githubUrl: "",
    portfolioUrl: "",
    targets: "",
    heardFrom: "",
    otherHeardFrom: "",
    privacyConsent: false,
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const resumeError = useMemo(() => {
    const file = formData.resumeFile;
    if (!file) return "";
    if (file.size > MAX_FILE_BYTES) return "File must be 5MB or smaller.";
    if (file.type && !ACCEPTED_MIME_TYPES.has(file.type)) {
      return "Only PDF, DOC, or DOCX files are allowed.";
    }
    return "";
  }, [formData.resumeFile]);

  const roleTypesInvalid = useMemo(() => formData.roleTypes.length === 0, [formData.roleTypes]);

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

  const handleRoleTypeToggle = (value: RoleTypeValue) => {
    setFormData((prev) => {
      const exists = prev.roleTypes.includes(value);
      return {
        ...prev,
        roleTypes: exists ? prev.roleTypes.filter((t) => t !== value) : [...prev.roleTypes, value],
      };
    });
  };

  const handleExpertiseChange = (value: ExpertiseValue) => {
    setFormData((prev) => ({
      ...prev,
      expertise: value,
      otherExpertise: value === "other" ? prev.otherExpertise : "",
    }));
  };

  const handleEmploymentStatusChange = (value: EmploymentStatusValue) => {
    setFormData((prev) => ({ ...prev, employmentStatus: value }));
  };

  const handleWorkArrangementChange = (value: WorkArrangementValue) => {
    setFormData((prev) => ({ ...prev, workArrangement: value }));
  };

  const handleStartTimeChange = (value: StartTimeValue) => {
    setFormData((prev) => ({ ...prev, startTime: value }));
  };

  const handleResumeFile = (file: File | null) => {
    setFormData((prev) => ({ ...prev, resumeFile: file }));
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) handleResumeFile(file);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const validateBeforeSubmit = () => {
    if (!formData.fullName.trim()) return "Please enter your full name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (!formData.phoneNumber.trim()) return "Please enter your phone number.";
    if (!formData.location) return "Please select your current location.";
    if (formData.location === "other" && !formData.otherLocation.trim()) return "Please enter your location.";
    if (!formData.expertise) return "Please select your primary expertise.";
    if (formData.expertise === "other" && !formData.otherExpertise.trim()) return "Please specify your expertise.";
    if (!formData.yearsExperience) return "Please select years of experience.";
    if (!formData.employmentStatus) return "Please select your current employment status.";
    if (!formData.topSkills.trim()) return "Please enter your top technical skills.";
    if (!formData.jobTitle.trim()) return "Please enter your current/most recent job title.";
    if (roleTypesInvalid) return "Please select at least one role type.";
    if (!formData.workArrangement) return "Please select your preferred work arrangement.";
    if (!formData.salaryRange) return "Please select your expected salary range.";
    if (!formData.startTime) return "Please select when you could start.";
    if (!formData.resumeFile) return "Please upload your resume/CV.";
    if (resumeError) return resumeError;
    if (!formData.privacyConsent) return "Please agree to the privacy policy.";
    if (formData.heardFrom === "other" && !formData.otherHeardFrom.trim()) return "Please specify how you heard about us.";
    if (formData.heardFrom && formData.heardFrom !== "other") return "";
    if (!formData.heardFrom) return "Please select how you heard about Talentifix.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateBeforeSubmit();
    if (error) {
      setStatus("error");
      setResponseMessage(error);
      return;
    }

    setStatus("loading");
    setResponseMessage("");

    const payload = new FormData();
    payload.set("fullName", formData.fullName.trim());
    payload.set("email", formData.email.trim());
    payload.set("phoneNumber", formData.phoneNumber.trim());
    payload.set("location", formData.location);
    payload.set("otherLocation", formData.otherLocation.trim());
    payload.set("linkedInUrl", formData.linkedInUrl.trim());
    payload.set("expertise", formData.expertise);
    payload.set("otherExpertise", formData.otherExpertise.trim());
    payload.set("yearsExperience", formData.yearsExperience);
    payload.set("employmentStatus", formData.employmentStatus);
    payload.set("topSkills", formData.topSkills.trim());
    payload.set("jobTitle", formData.jobTitle.trim());
    payload.set("company", formData.company.trim());
    payload.set("roleTypes", JSON.stringify(formData.roleTypes));
    payload.set("workArrangement", formData.workArrangement);
    payload.set("salaryRange", formData.salaryRange);
    payload.set("startTime", formData.startTime);
    payload.set("githubUrl", formData.githubUrl.trim());
    payload.set("portfolioUrl", formData.portfolioUrl.trim());
    payload.set("targets", formData.targets.trim());
    payload.set("heardFrom", formData.heardFrom);
    payload.set("otherHeardFrom", formData.otherHeardFrom.trim());
    payload.set("privacyConsent", String(formData.privacyConsent));

    if (formData.resumeFile) {
      payload.set("resume", formData.resumeFile, formData.resumeFile.name);
    }

    try {
      const response = await fetch("/api/candidate-registration", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setResponseMessage(data.message);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          location: "",
          otherLocation: "",
          linkedInUrl: "",
          expertise: "",
          otherExpertise: "",
          yearsExperience: "",
          employmentStatus: "",
          topSkills: "",
          jobTitle: "",
          company: "",
          roleTypes: [],
          workArrangement: "",
          salaryRange: "",
          startTime: "",
          resumeFile: null,
          githubUrl: "",
          portfolioUrl: "",
          targets: "",
          heardFrom: "",
          otherHeardFrom: "",
          privacyConsent: false,
        });
      } else {
        setStatus("error");
        setResponseMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMessage("Failed to submit. Please check your connection and try again.");
    }
  };

  const resumeName = formData.resumeFile?.name ?? "";

  return (
    <section className="w-full bg-[#F2F4F8] py-16 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-[40px] font-bold font-notch text-[#1E1E24]">
            Join Our Talent Network<span className="text-[#00DDE2]">.</span>
          </h2>
          <p className="text-lg text-[#1E1E24] opacity-70 font-medium max-w-3xl">
            We specialize in AI/ML and Cybersecurity roles. If that&apos;s you, let&apos;s connect.
          </p>
        </div>

        {status === "success" && (
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Profile Received!</p>
              <p className="text-green-700 text-sm mt-1">{responseMessage}</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
            <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Couldn&apos;t Submit</p>
              <p className="text-red-700 text-sm mt-1">{responseMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-6">
            <h3 className="text-[22px] font-bold text-[#1E1E24]">Basic Info</h3>

            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-lg font-medium text-[#1E1E24]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-medium text-[#1E1E24]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-[#1E1E24]">
                Phone Number <span className="text-red-500">*</span>
              </label>
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
              <label htmlFor="location" className="text-lg font-medium text-[#1E1E24]">
                Current Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0000FF] cursor-pointer"
                >
                  <option value="">Select a city</option>
                  {LOCATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-6 h-6 text-[#0000FF]" />
                </div>
              </div>
              {formData.location === "other" && (
                <input
                  id="otherLocation"
                  name="otherLocation"
                  value={formData.otherLocation}
                  onChange={handleChange}
                  required
                  placeholder="Enter your location"
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="linkedInUrl" className="text-lg font-medium text-[#1E1E24]">
                LinkedIn Profile URL <span className="text-[#1E1E24]/50">(Optional)</span>
              </label>
              <input
                type="url"
                id="linkedInUrl"
                name="linkedInUrl"
                value={formData.linkedInUrl}
                onChange={handleChange}
                placeholder="linkedin.com/in/yourprofile"
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
              <p className="text-sm text-[#1E1E24]/60">
                Helps us validate your background faster.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[22px] font-bold text-[#1E1E24]">Professional Profile</h3>

            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-[#1E1E24]">
                What&apos;s your primary expertise? <span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col gap-3">
                {EXPERTISE_OPTIONS.map((option) => {
                  const checked = formData.expertise === option.value;
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 border border-[#1E1E24] rounded-[10px] p-4 bg-[#F2F4F8] hover:bg-white transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="expertise"
                        value={option.value}
                        checked={checked}
                        onChange={() => handleExpertiseChange(option.value)}
                        className="h-4 w-4 accent-[#0000FF]"
                        required
                      />
                      <span className="text-[#1E1E24]">{option.label}</span>
                    </label>
                  );
                })}
              </div>
              {formData.expertise === "other" && (
                <input
                  id="otherExpertise"
                  name="otherExpertise"
                  value={formData.otherExpertise}
                  onChange={handleChange}
                  required
                  placeholder="Your expertise"
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="yearsExperience" className="text-lg font-medium text-[#1E1E24]">
                Years of professional experience <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="yearsExperience"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0000FF] cursor-pointer"
                >
                  <option value="">Select</option>
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-6 h-6 text-[#0000FF]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-[#1E1E24]">
                Current Employment Status <span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col gap-3">
                {EMPLOYMENT_OPTIONS.map((option) => {
                  const checked = formData.employmentStatus === option.value;
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 border border-[#1E1E24] rounded-[10px] p-4 bg-[#F2F4F8] hover:bg-white transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="employmentStatus"
                        value={option.value}
                        checked={checked}
                        onChange={() => handleEmploymentStatusChange(option.value)}
                        className="h-4 w-4 accent-[#0000FF]"
                        required
                      />
                      <span className="text-[#1E1E24]">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="topSkills" className="text-lg font-medium text-[#1E1E24]">
                What are your top 3-5 technical skills? <span className="text-red-500">*</span>
              </label>
              <input
                id="topSkills"
                name="topSkills"
                value={formData.topSkills}
                onChange={handleChange}
                required
                placeholder="E.g., PyTorch, Computer Vision, NLP, AWS SageMaker..."
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
              />
              <p className="text-sm text-[#1E1E24]/60">Separate with commas</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="jobTitle" className="text-lg font-medium text-[#1E1E24]">
                  Current/Most Recent Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  placeholder="Your job title"
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="company" className="text-lg font-medium text-[#1E1E24]">
                  Current/Most Recent Company <span className="text-[#1E1E24]/50">(Optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[22px] font-bold text-[#1E1E24]">Job Preferences</h3>

            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-[#1E1E24]">
                What type of role are you looking for? <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ROLE_TYPE_OPTIONS.map((option) => {
                  const checked = formData.roleTypes.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 border border-[#1E1E24] rounded-[10px] p-4 bg-[#F2F4F8] hover:bg-white transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleRoleTypeToggle(option.value)}
                        className="h-4 w-4 accent-[#0000FF]"
                      />
                      <span className="text-[#1E1E24]">{option.label}</span>
                    </label>
                  );
                })}
              </div>
              {roleTypesInvalid && status === "error" && (
                <p className="text-sm text-red-700">Select at least one role type.</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-[#1E1E24]">
                Preferred work arrangement <span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col gap-3">
                {WORK_ARRANGEMENT_OPTIONS.map((option) => {
                  const checked = formData.workArrangement === option.value;
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 border border-[#1E1E24] rounded-[10px] p-4 bg-[#F2F4F8] hover:bg-white transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="workArrangement"
                        value={option.value}
                        checked={checked}
                        onChange={() => handleWorkArrangementChange(option.value)}
                        className="h-4 w-4 accent-[#0000FF]"
                        required
                      />
                      <span className="text-[#1E1E24]">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="salaryRange" className="text-lg font-medium text-[#1E1E24]">
                Expected salary range (Annual CTC) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0000FF] cursor-pointer"
                >
                  <option value="">Select</option>
                  {SALARY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-6 h-6 text-[#0000FF]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-[#1E1E24]">
                When could you start a new role? <span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col gap-3">
                {START_TIME_OPTIONS.map((option) => {
                  const checked = formData.startTime === option.value;
                  return (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 border border-[#1E1E24] rounded-[10px] p-4 bg-[#F2F4F8] hover:bg-white transition-colors cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="startTime"
                        value={option.value}
                        checked={checked}
                        onChange={() => handleStartTimeChange(option.value)}
                        className="h-4 w-4 accent-[#0000FF]"
                        required
                      />
                      <span className="text-[#1E1E24]">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[22px] font-bold text-[#1E1E24]">Additional Info</h3>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-[#1E1E24]">
                Resume/CV Upload <span className="text-red-500">*</span>
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => handleResumeFile(e.target.files?.[0] ?? null)}
                className="hidden"
              />

              <div
                onClick={openFilePicker}
                onDrop={onDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                className={[
                  "w-full border rounded-[10px] p-6 cursor-pointer transition-colors",
                  isDragging ? "border-[#0000FF] bg-white" : "border-[#1E1E24] bg-[#F2F4F8] hover:bg-white",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-[10px] bg-[#0000FF]/10 flex items-center justify-center">
                    <UploadCloud className="h-6 w-6 text-[#0000FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1E1E24] font-bold">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-sm text-[#1E1E24]/60">
                      Accepted: PDF, DOC, DOCX • Max size: 5MB
                    </p>
                    {resumeName && (
                      <p className="text-sm text-[#1E1E24]/80 mt-2">
                        Selected: <span className="font-medium">{resumeName}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {resumeError && <p className="text-sm text-red-700">{resumeError}</p>}
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="githubUrl" className="text-lg font-medium text-[#1E1E24]">
                  GitHub Profile URL <span className="text-[#1E1E24]/50">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="github.com/yourhandle"
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="portfolioUrl" className="text-lg font-medium text-[#1E1E24]">
                  Portfolio / Personal Website <span className="text-[#1E1E24]/50">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="yourwebsite.com"
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="targets" className="text-lg font-medium text-[#1E1E24]">
                Any specific companies or types of roles you&apos;re targeting?{" "}
                <span className="text-[#1E1E24]/50">(Optional)</span>
              </label>
              <textarea
                id="targets"
                name="targets"
                value={formData.targets}
                onChange={handleChange}
                rows={4}
                placeholder="E.g., Early-stage startups, AI research labs, Series B+ companies, etc."
                className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF] resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="heardFrom" className="text-lg font-medium text-[#1E1E24]">
                How did you hear about Talentifix? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="heardFrom"
                  name="heardFrom"
                  value={formData.heardFrom}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0000FF] cursor-pointer"
                >
                  <option value="">Select</option>
                  {HEARD_FROM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-6 h-6 text-[#0000FF]" />
                </div>
              </div>
              {formData.heardFrom === "other" && (
                <input
                  id="otherHeardFrom"
                  name="otherHeardFrom"
                  value={formData.otherHeardFrom}
                  onChange={handleChange}
                  required
                  placeholder="Please specify"
                  className="w-full bg-[#F2F4F8] border border-[#1E1E24] rounded-[5px] p-4 text-[#1E1E24] placeholder:text-[#1E1E24]/20 focus:outline-none focus:ring-1 focus:ring-[#0000FF]"
                />
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3 text-[#1E1E24]">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-[#0000FF]"
                  required
                />
                <span className="text-sm md:text-base">
                  I agree to Talentifix storing and processing my information for recruitment purposes.{" "}
                  <Link href="/privacy-policy" className="text-[#0000FF] underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 bg-[#0000FF] hover:bg-[#000099] disabled:bg-[#0000FF]/50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-[5px] font-bold text-lg transition-colors w-full md:w-fit"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SUBMITTING...
                </>
              ) : (
                <>
                  Join the Network <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-sm text-[#1E1E24]/60 max-w-3xl">
              We review every profile personally and will reach out if we have relevant opportunities.
              Usually within 48 hours.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
