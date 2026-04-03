import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', description: 'e.g. 5 min read' }),
    defineField({ name: 'introduction', title: 'Introduction', type: 'text', rows: 4 }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body', title: 'Body', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] },
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
  ],
  preview: { select: { title: 'title', media: 'mainImage', subtitle: 'category' } },
})