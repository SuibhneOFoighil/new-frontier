import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'

export default async function BlogPage() {
  // Dynamically fetch posts from the file system
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-cream-white dark:bg-off-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <header className="mb-12 lg:mb-16 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-off-black dark:text-cream-white mb-4 lg:mb-6">
            Blog
          </h1>
          <p className="font-sans text-lg sm:text-xl text-off-black/70 dark:text-cream-white/80 max-w-2xl mx-auto">
            Thoughts, ideas, and technical explorations
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6 lg:mt-8"></div>
        </header>
        
        {/* Posts Grid */}
        <main className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid gap-8 lg:gap-12">
              {posts.map((post, index) => (
                <article 
                  key={post.slug} 
                  className="group relative bg-cream-white dark:bg-off-black border border-off-black/10 dark:border-cream-white/20 rounded-xl p-6 sm:p-8 lg:p-10 hover:shadow-xl hover:shadow-off-black/5 dark:hover:shadow-cream-white/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block"
                  >
                    {/* Post Number */}
                    <div className="flex items-center justify-between mb-4 lg:mb-6">
                      <span className="font-mono text-xs sm:text-sm text-off-black/40 dark:text-cream-white/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <time className="font-mono text-xs sm:text-sm text-off-black/60 dark:text-cream-white/60">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* Post Content */}
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-off-black dark:text-cream-white group-hover:text-orange-red dark:group-hover:text-orange-red transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="font-sans text-base sm:text-lg text-off-black/70 dark:text-cream-white/80 mb-6 lg:mb-8 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center font-sans text-sm sm:text-base font-medium text-jade-teal group-hover:text-orange-red transition-colors duration-200">
                      Read more
                      <svg 
                        className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 h-px bg-gradient-to-r from-transparent via-jade-teal/30 to-transparent"></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="font-sans text-lg text-off-black/60 dark:text-cream-white/60">
                No blog posts found.
              </p>
            </div>
          )}

          {/* Coming Soon */}
          <div className="mt-12 lg:mt-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-off-black/5 dark:bg-cream-white/10 rounded-full border border-off-black/10 dark:border-cream-white/20">
              <span className="font-sans text-sm text-off-black/60 dark:text-cream-white/60">
                More posts coming soon...
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 