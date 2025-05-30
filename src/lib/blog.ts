import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author?: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'src/app/blog')
  
  try {
    const entries = fs.readdirSync(blogDir, { withFileTypes: true })
    const posts: BlogPost[] = []
    
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'page.tsx' && entry.name !== 'layout.tsx') {
        const postDir = path.join(blogDir, entry.name)
        const mdxPath = path.join(postDir, 'page.mdx')
        
        if (fs.existsSync(mdxPath)) {
          try {
            const content = fs.readFileSync(mdxPath, 'utf-8')
            const metadata = extractMetadata(content)
            
            if (metadata) {
              posts.push({
                slug: entry.name,
                title: metadata.title,
                excerpt: metadata.excerpt,
                date: metadata.date,
                author: metadata.author
              })
            }
          } catch (error) {
            console.warn(`Failed to read metadata from ${mdxPath}:`, error)
          }
        }
      }
    }
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Failed to read blog directory:', error)
    return []
  }
}

function extractMetadata(content: string): { title: string; excerpt: string; date: string; author?: string } | null {
  // Look for the metadata export at the beginning of the file
  const metadataMatch = content.match(/export const metadata = \{([^}]+)\}/)
  
  if (!metadataMatch) {
    return null
  }
  
  const metadataString = metadataMatch[1]
  
  // Extract individual fields using regex that handles escaped quotes
  // This regex matches: field: 'content with possible \' escaped quotes'
  const titleMatch = metadataString.match(/title:\s*['"`]((?:\\.|[^'"`\\])*?)['"`]/)
  const excerptMatch = metadataString.match(/excerpt:\s*['"`]((?:\\.|[^'"`\\])*?)['"`]/)
  const dateMatch = metadataString.match(/date:\s*['"`]((?:\\.|[^'"`\\])*?)['"`]/)
  const authorMatch = metadataString.match(/author:\s*['"`]((?:\\.|[^'"`\\])*?)['"`]/)
  
  if (!titleMatch || !excerptMatch || !dateMatch) {
    return null
  }
  
  // Unescape the extracted strings
  const unescapeString = (str: string) => str.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, "\\")
  
  return {
    title: unescapeString(titleMatch[1]),
    excerpt: unescapeString(excerptMatch[1]),
    date: unescapeString(dateMatch[1]),
    author: authorMatch ? unescapeString(authorMatch[1]) : undefined
  }
} 