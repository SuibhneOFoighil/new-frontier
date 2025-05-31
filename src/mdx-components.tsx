import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import YouTube from '@/components/YouTube'
import Subscribe from '@/components/Subscribe'
import Slider from '@/app/blog/intro-to-vibe-coding/demo-slider'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 text-off-black dark:text-cream-white leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 lg:mb-6 text-off-black dark:text-cream-white leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 lg:mb-4 text-off-black dark:text-cream-white leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-serif text-lg sm:text-xl lg:text-2xl font-semibold mb-3 text-off-black dark:text-cream-white leading-tight">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="font-sans text-base sm:text-lg mb-4 lg:mb-6 text-off-black/80 dark:text-cream-white/90 leading-relaxed">
        {children}
      </p>
    ),
    a: ({ children, href }) => (
      <a 
        href={href} 
        className="relative font-mono text-xs align-super text-jade-teal dark:text-jade-teal hover:text-orange-red dark:hover:text-orange-red no-underline hover:underline decoration-1 underline-offset-2 transition-colors duration-200 ml-0.5 px-1 py-0.5 bg-jade-teal/10 dark:bg-jade-teal/20 rounded border border-jade-teal/20 dark:border-jade-teal/30 hover:bg-orange-red/10 dark:hover:bg-orange-red/20 hover:border-orange-red/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="font-sans mb-4 lg:mb-6 ml-4 sm:ml-6 list-disc text-off-black/80 dark:text-cream-white/90 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="font-sans mb-4 lg:mb-6 ml-4 sm:ml-6 list-decimal text-off-black/80 dark:text-cream-white/90 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-base sm:text-lg leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-jade-teal pl-4 sm:pl-6 my-6 lg:my-8 italic text-off-black/70 dark:text-cream-white/80 bg-jade-teal/5 dark:bg-jade-teal/10 py-4 rounded-r-lg">
        <div className="font-serif text-lg sm:text-xl">
          {children}
        </div>
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="font-mono bg-off-black/5 dark:bg-cream-white/10 px-2 py-1 rounded text-sm font-medium text-orange-red dark:text-gold border border-off-black/10 dark:border-cream-white/20">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="font-mono bg-off-black/5 dark:bg-cream-white/5 p-4 sm:p-6 rounded-lg overflow-x-auto mb-6 lg:mb-8 border border-off-black/10 dark:border-cream-white/20 text-sm sm:text-base">
        <div className="text-off-black dark:text-cream-white">
          {children}
        </div>
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-sans font-bold text-orange-red dark:text-gold">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="font-sans italic text-jade-teal dark:text-jade-teal">
        {children}
      </em>
    ),
    hr: () => (
      <hr className="my-8 lg:my-12 border-0 h-px bg-gradient-to-r from-transparent via-jade-teal to-transparent" />
    ),
    img: (props) => (
      <Image
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        style={{ width: '100%', height: 'auto' }}
        className="rounded-lg shadow-lg my-6 lg:my-8"
        {...(props as ImageProps)}
        alt={props.alt || ""}
      />
    ),
    aside: ({ children }: { children: React.ReactNode }) => (
      <aside className="my-6 lg:my-8 p-4 sm:p-6 bg-gradient-to-r from-jade-teal/10 to-gold/10 dark:from-jade-teal/20 dark:to-gold/20 border-l-4 border-jade-teal rounded-r-lg">
        <div className="font-serif text-base sm:text-lg italic text-off-black/80 dark:text-cream-white/90 leading-relaxed">
          {children}
        </div>
      </aside>
    ),
    Callout: ({ children }: { children: React.ReactNode }) => (
      <div className="my-6 lg:my-8 p-4 sm:p-6 bg-gradient-to-r from-jade-teal/10 to-gold/10 dark:from-jade-teal/20 dark:to-gold/20 border-l-4 border-jade-teal rounded-r-lg">
        <div className="font-serif text-base sm:text-lg text-off-black/80 dark:text-cream-white/90 leading-relaxed">
          {children}
        </div>
      </div>
    ),
    YouTube,
    Subscribe,
    Slider,
    ...components,
  }
} 