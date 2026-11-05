import { defineField, defineType } from "sanity";

export const jobType = defineType({
  name: "job",
  title: "Job Posting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Role Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: 'e.g. "Now Hiring"',
      initialValue: "Now Hiring",
    }),
    defineField({
      name: "isOpen",
      title: "Open for Applications",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Bengaluru, India - On-site"',
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      description: 'e.g. "Full-time | Day Shift"',
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "string",
      description: 'e.g. "10+ Years Experience"',
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      description: 'e.g. "Domestic Staffing & Staff Augmentation"',
    }),
    defineField({
      name: "applyEmail",
      title: "Apply Email",
      type: "string",
      initialValue: "careers@talentifi-x.com",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "validThrough",
      title: "Applications Close",
      type: "datetime",
      description:
        "Optional. Only set this if the role has a real closing date: it is shown on the job page and sent to Google Jobs, which drops the listing after that date. Leave blank for roles open until filled.",
    }),
    defineField({
      name: "salary",
      title: "Salary Range",
      type: "object",
      description:
        "Optional. Shown on the job page and sent to Google Jobs, which recommends pay details and displays them in its listing. Fill the minimum (and the maximum for a range), the currency and the period.",
      fields: [
        defineField({ name: "min", title: "Minimum", type: "number", validation: (Rule) => Rule.min(0) }),
        defineField({ name: "max", title: "Maximum", type: "number", validation: (Rule) => Rule.min(0) }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          options: { list: ["INR", "USD"] },
          initialValue: "INR",
        }),
        defineField({
          name: "unit",
          title: "Per",
          type: "string",
          options: {
            list: [
              { title: "Year", value: "YEAR" },
              { title: "Month", value: "MONTH" },
              { title: "Hour", value: "HOUR" },
            ],
          },
          initialValue: "YEAR",
        }),
      ],
    }),
    defineField({
      name: "aboutRole",
      title: "About the Role",
      type: "text",
      rows: 6,
      description: "Intro paragraph(s) shown under the hero.",
    }),
    defineField({
      name: "responsibilities",
      title: "What You'll Do",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      title: "What We're Looking For",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whoYouAre",
      title: "Who You Are",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "whyJoinIntro",
      title: "Why TalentiFi-X - Intro",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "whyJoinPoints",
      title: "Why TalentiFi-X - Bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", status: "isOpen" },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle ?? ""}${status === false ? " · Closed" : ""}`,
      };
    },
  },
});
