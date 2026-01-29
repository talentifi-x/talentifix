'use client'

import {NextStudio} from 'next-sanity/studio'
import config from '../../../sanity/sanity.config.production'

export default function StudioPage() {
  return <NextStudio config={config} />
}