export const blogSchemas = [
  {
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 3,
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'featuredImage',
        title: 'Featured Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'category' }] }],
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'readingTime',
        title: 'Reading Time (minutes)',
        type: 'number',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          { type: 'block' },
          { type: 'image' },
          { type: 'jsonTable' },
          { type: 'faqSection' },
        ],
      },
      {
        name: 'tableOfContents',
        title: 'Table of Contents',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'tableOfContentsItem',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'id',
                title: 'ID',
                type: 'string',
              },
              {
                name: 'level',
                title: 'Level',
                type: 'number',
              },
            ],
          },
        ],
      },
      {
        name: 'seoTitle',
        title: 'SEO Title',
        type: 'string',
      },
      {
        name: 'seoDescription',
        title: 'SEO Description',
        type: 'text',
        rows: 3,
      },
      {
        name: 'isFeatured',
        title: 'Featured Post',
        type: 'boolean',
        initialValue: false,
      },
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        media: 'featuredImage',
        publishedAt: 'publishedAt',
      },
      prepare(selection: any) {
        const { author, publishedAt } = selection;
        return Object.assign({}, selection, {
          subtitle: author && publishedAt
            ? `by ${author} on ${new Date(publishedAt).toLocaleDateString()}`
            : 'No author or date',
        });
      },
    },
  },
  {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
        rows: 4,
      },
    ],
  },
  {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 3,
      },
    ],
  },
  {
    name: 'jsonTable',
    title: 'JSON Table',
    type: 'object',
    fields: [
      {
        name: 'title',
        title: 'Table Title',
        type: 'string',
      },
      {
        name: 'jsonData',
        title: 'JSON Data',
        type: 'text',
        description: 'Enter valid JSON data for the table',
        validation: (Rule: any) => Rule.custom((value: string) => {
          if (!value) return true;
          try {
            JSON.parse(value);
            return true;
          } catch (e) {
            return 'Invalid JSON format';
          }
        }),
      },
      {
        name: 'columns',
        title: 'Column Configuration',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'jsonTableColumn',
            fields: [
              {
                name: 'key',
                title: 'Data Key',
                type: 'string',
              },
              {
                name: 'title',
                title: 'Column Title',
                type: 'string',
              },
              {
                name: 'type',
                title: 'Column Type',
                type: 'string',
                options: {
                  list: ['text', 'number', 'boolean', 'date', 'link'],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'faqSection',
    title: 'FAQ Section',
    type: 'object',
    fields: [
      {
        name: 'title',
        title: 'Section Title',
        type: 'string',
        initialValue: 'Frequently Asked Questions',
      },
      {
        name: 'faqs',
        title: 'FAQs',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'faqItem',
            fields: [
              {
                name: 'question',
                title: 'Question',
                type: 'string',
                validation: (Rule: any) => Rule.required(),
              },
              {
                name: 'answer',
                title: 'Answer',
                type: 'text',
                rows: 4,
                validation: (Rule: any) => Rule.required(),
              },
            ],
          },
        ],
      },
    ],
  },
];
