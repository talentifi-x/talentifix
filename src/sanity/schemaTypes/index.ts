import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './post'
import { jobType } from './job'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, jobType],
}