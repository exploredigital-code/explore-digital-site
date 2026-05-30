export type { PostContent } from './blog-content-a'
import { contentA } from './blog-content-a'
import { contentB } from './blog-content-b'

export const blogContent = { ...contentA, ...contentB }
