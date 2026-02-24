# Blog Setup Instructions

## 1. Sanity CMS Setup

1. Go to [sanity.io](https://www.sanity.io/) and create a new project
2. Get your project ID from the Sanity dashboard
3. Create an API token with read/write permissions

## 2. Environment Variables

Copy the `.env.local.example` file to `.env.local` and fill in your Sanity credentials:

```bash
cp .env.local.example .env.local
```

Update the values in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Usually "production"
- `SANITY_API_TOKEN`: Your Sanity API token

## 3. Sanity Schema

The blog includes the following schemas:
- `blogPost`: Main blog post content
- `author`: Author information
- `category`: Post categories
- `jsonTable`: Custom JSON table component
- `faqSection`: FAQ sections
- `tableOfContents`: Table of contents entries

## 4. Features

- **Main Blog Page**: `/blog` - Lists all blog posts with featured post section
- **Blog Post Page**: `/blog/[slug]` - Individual blog post with table of contents
- **Custom JSON Table**: Embed data tables in blog posts using JSON
- **FAQ Sections**: Add expandable FAQ sections to blog posts
- **Table of Contents**: Auto-generated from post headings
- **SEO Optimized**: Meta tags, structured data, and social sharing
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 5. Usage

### Creating Blog Posts

1. Go to your Sanity Studio
2. Create a new blog post
3. Add content using the rich text editor
4. Insert JSON tables using the "JSON Table" block
5. Add FAQ sections using the "FAQ Section" block
6. Set up table of contents entries
7. Publish your post

### Custom Components

- **JsonTable**: Renders JSON data as responsive tables
- **FaqSection**: Creates expandable FAQ sections
- **TableOfContents**: Generates interactive table of contents

## 6. Color Theme

The blog follows the TalentiFi-X color scheme:
- Primary: `#0000FF` (blue)
- Secondary: `#00DDE2` (cyan)
- Background: `#F8F9FA` (light gray)

## 7. Testing

After setup, test the blog:
1. Navigate to `/blog` to see the main page
2. Click on individual posts to test the inner pages
3. Verify table of contents navigation
4. Test JSON table rendering
5. Check FAQ section functionality
6. Test mobile responsiveness