import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description:
        'Off = hidden from the website entirely: the post disappears from /blog, its own URL returns 404, and it drops out of the sitemap. It stays here in Sanity, fully editable. On = live as normal.',
    }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({
      name: 'founderInsights',
      title: 'Show founder insights',
      type: 'boolean',
      initialValue: false,
      description:
        'On = the post shows "With insights from Chetan Mangalwedhe" under the author and an expert card, linked to his profile, after the FAQ. Use it when the article draws on his views. Keep the Author field for whoever wrote it.',
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description:
        'Set this ONLY when the article itself changes in a meaningful way (new section, revised advice, updated figures). It is shown to readers and sent to Google as the modified date. Leave it alone for typo, spelling or SEO-field edits.',
    }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', description: 'e.g. 5 min read' }),
    defineField({ name: 'introduction', title: 'Introduction', type: 'text', rows: 4 }),
    defineField({
      name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt', title: 'Alt Text', type: 'string',
          description: 'Describe what the image shows, for screen readers and Google Images.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body', title: 'Body', type: 'array',
      of: [
        {
          type: 'block',
          // The post title is the page's only H1, so body headings start at H2.
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image', options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }],
        },
        {
          type: 'object',
          name: 'table',
          title: 'Table',
          fields: [
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              description: 'The first row is the header. In the other rows, the first cell is the row label.',
              of: [{
                type: 'object',
                name: 'tableRow',
                title: 'Row',
                fields: [defineField({ name: 'cells', title: 'Cells', type: 'array', of: [{ type: 'string' }] })],
                preview: {
                  select: { cells: 'cells' },
                  prepare: ({ cells }) => ({ title: (cells ?? []).join(' | ') }),
                },
              }],
              validation: (Rule) => Rule.min(2).error('A table needs a header row and at least one row.'),
            }),
          ],
          preview: {
            select: { rows: 'rows' },
            prepare: ({ rows }) => ({
              title: `Table: ${(rows?.[0]?.cells ?? []).join(' | ') || 'empty'}`,
              subtitle: `${Math.max((rows?.length ?? 1) - 1, 0)} rows`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'faq', title: 'FAQ', type: 'array',
      of: [{
        type: 'object', name: 'faqItem', title: 'FAQ Item',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description:
        'Optional. Shown in search results instead of the headline. Keep under 60 characters - longer titles get truncated by Google. Leave blank to use the headline.',
      validation: (Rule) => Rule.max(60).warning('Google truncates titles past ~60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 2,
      description:
        'Optional. The snippet under the title in search results. Aim for 120-155 characters. Leave blank to use the introduction.',
      validation: (Rule) => Rule.max(155).warning('Google truncates descriptions past ~155 characters.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image (SEO)',
      type: 'image',
      description:
        'Optional. The picture shown when the post is shared on LinkedIn, WhatsApp or X. Use 1200 x 630 pixels. Leave blank to use the main image.',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from Google',
      type: 'boolean',
      initialValue: false,
      description:
        'On = the post stays on the website but asks search engines not to list it, and it leaves the sitemap. Use for thin or duplicate posts. To remove a post entirely, use "Published" instead.',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', category: 'category', published: 'published' },
    // Surface hidden posts in the studio list so an unpublished draft is obvious.
    prepare({ title, media, category, published }) {
      const label = category || 'Uncategorised'
      return {
        title,
        media,
        subtitle: published === false ? `Hidden - ${label}` : label,
      }
    },
  },
})