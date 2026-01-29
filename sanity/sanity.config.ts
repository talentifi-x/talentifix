import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {blogSchemas} from '../src/lib/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Talentifi-X Blog Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [deskTool()],

  schema: {
    types: blogSchemas,
  },
})
