# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog application called "New Frontier" focused on ethics, society, and the future of humanity.

New Frontier is a Next.js-based blog/application built with modern React (v19) and TypeScript. It uses MDX for blog content with custom components for enhanced blog functionality, including YouTube embeds and subscription features.

## Development Commands

```bash
# Start the development server with turbopack
npm run dev

# Build the application for production
npm run build

# Start the production server
npm run start

# Run linting
npm run lint
```

The project can also be run using Bun:
```bash
bun dev
```

**Important**: Always run `npm run lint` after making changes to ensure code quality. The project uses ESLint with Next.js configurations.

## Architecture

### Core Technologies
- **Next.js** (v15.3) with App Router
- **React** (v19)
- **TypeScript** with strict mode enabled
- **MDX** for blog content with `@mdx-js/loader` and `@mdx-js/react`
- **TailwindCSS** (v4) for styling with custom design tokens
- **Turbopack** for fast development builds
- **Husky** for Git hooks
- **Additional libraries**: Framer Motion (animations), Sonner (toasts), clsx/tailwind-merge (conditional styling)

### Key Components

The project follows a standard Next.js App Router structure:

1. **Blog System**:
   - Blog posts are stored as MDX files in `/src/app/blog/[slug]/page.mdx`
   - Metadata is exported at the top of each MDX file
   - The `getBlogPosts()` function in `/src/lib/blog.ts` handles fetching and sorting all blog posts

2. **MDX Components**:
   - Custom MDX components are defined in `/src/mdx-components.tsx`
   - These provide styled versions of standard HTML elements (headings, paragraphs, links, etc.)
   - Special components include:
     - `<YouTube>` for embedding videos
     - `<Subscribe>` for newsletter subscription forms
     - `<Callout>` for highlighted text sections

3. **Design System**:
   - Custom color scheme with variables like `jade-teal`, `orange-red`, `cream-white`, and `off-black`
   - Typography: EB Garamond (serif), Lato (sans-serif), Fira Code (monospace)
   - Responsive design patterns with Tailwind breakpoints
   - Dark/light mode support through Tailwind classes

4. **API Routes**:
   - `/api/subscribe` - Newsletter subscription handling
   - `/api/confirm` - Email confirmation logic

## File Structure

```
- /src
  - /app           # Next.js app router pages and routes
    - /blog        # Blog posts and layout
    - /api         # API routes (subscribe, confirm)
    - /subscribe   # Subscription page
  - /components    # Reusable React components
  - /lib           # Utility functions (blog.ts for post management)
  - mdx-components.tsx # Custom MDX component definitions
```

## Workflow Notes

- **Blog Posts**: Created in MDX format with metadata exported at the top of each file
- **Custom Components**: Can be used directly within MDX content (YouTube, Subscribe, Callout)
- **Styling**: Uses Tailwind CSS with custom design tokens and dark/light mode support
- **Path Aliases**: `@/*` maps to `./src/*` for clean imports
- **SEO**: Comprehensive metadata, OpenGraph, and Twitter cards configured
- **Domain**: Production site at `newfrontier.app`

## Blog Post Structure

Each blog post follows this pattern:
```typescript
// Export metadata at the top
export const metadata = {
  title: "Post Title",
  excerpt: "Brief description...",
  date: "2024-01-01",
  author: "Author Name"
};

// Then the MDX content
# Post Title

Content here...
```