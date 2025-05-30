import Logo from "@/components/Logo";
import { getBlogPosts } from '@/lib/blog';

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-cream-white dark:bg-off-black transition-colors duration-300">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Minimal Hero Section */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-off-black dark:text-cream-white leading-tight">
            <span className="text-orange-red dark:text-orange-red flex items-center justify-center gap-3">
              <Logo width={40} height={40} priority={true} />
              <span>Molus</span>
            </span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-off-black/70 dark:text-cream-white/80 max-w-xl mx-auto leading-relaxed">
            Thoughts, ideas, and technical explorations
          </p>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4 sm:mt-6"></div>
        </header>
        
        {/* Blog Posts */}
        <main className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:gap-8">
              {posts.map((post, index) => (
                <article 
                  key={post.slug} 
                  className="group relative bg-cream-white dark:bg-off-black border border-off-black/10 dark:border-cream-white/20 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg sm:hover:shadow-xl hover:shadow-off-black/5 dark:hover:shadow-cream-white/5 transition-all duration-300 active:scale-[0.98] sm:hover:-translate-y-1"
                >
                  <a 
                    href={`/blog/${post.slug}`}
                    className="block touch-manipulation"
                  >
                    {/* Post Number and Date */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="font-mono text-xs text-off-black/40 dark:text-cream-white/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <time className="font-mono text-xs text-off-black/60 dark:text-cream-white/60">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* Post Content */}
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-off-black dark:text-cream-white group-hover:text-orange-red dark:group-hover:text-orange-red transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="font-sans text-sm sm:text-base text-off-black/70 dark:text-cream-white/80 mb-4 sm:mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center font-sans text-sm sm:text-base font-medium text-jade-teal group-hover:text-orange-red transition-colors duration-200 min-h-[44px] sm:min-h-0">
                      <span className="mr-2">Read more</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </a>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 h-px bg-gradient-to-r from-transparent via-jade-teal/30 to-transparent"></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 px-4">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-off-black/5 dark:bg-cream-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-off-black/40 dark:text-cream-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="font-sans text-base sm:text-lg text-off-black/60 dark:text-cream-white/60 mb-2">
                  No blog posts yet
                </p>
                <p className="font-sans text-sm text-off-black/50 dark:text-cream-white/50">
                  Check back soon for new content!
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
