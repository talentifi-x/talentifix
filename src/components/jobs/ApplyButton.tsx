"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ApplyModal } from "./ApplyModal";

interface ApplyButtonProps {
  jobTitle: string;
  jobSlug: string;
  variant?: "primary" | "link";
  label?: string;
}

export function ApplyButton({
  jobTitle,
  jobSlug,
  variant = "primary",
  label = "Apply Now",
}: ApplyButtonProps) {
  const [open, setOpen] = useState(false);

  const className =
    variant === "link"
      ? "inline-flex items-center gap-2 text-primary font-bold font-notch text-base hover:underline"
      : "inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold font-notch text-sm uppercase tracking-wider px-6 py-3 rounded-sm transition-colors";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
        <ArrowRight className="w-4 h-4" />
      </button>
      <ApplyModal
        open={open}
        onClose={() => setOpen(false)}
        jobTitle={jobTitle}
        jobSlug={jobSlug}
      />
    </>
  );
}
