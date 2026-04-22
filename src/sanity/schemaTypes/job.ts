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
      description: 'e.g. "Bengaluru, India — On-site"',
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
      title: "Why TalentiFi-X — Intro",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "whyJoinPoints",
      title: "Why TalentiFi-X — Bullets",
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
