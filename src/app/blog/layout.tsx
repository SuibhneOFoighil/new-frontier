import Link from 'next/link'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-cream-white dark:bg-off-black transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-off-black/10 dark:border-cream-white/20 bg-cream-white/80 dark:bg-off-black/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog" 
              className="font-sans text-sm sm:text-base text-jade-teal hover:text-orange-red transition-colors duration-200 flex items-center"
            >
              ← Back to Blog
            </Link>
            
            <Link 
              href="/" 
              className="font-serif text-lg sm:text-xl font-bold text-off-black dark:text-cream-white hover:text-orange-red dark:hover:text-orange-red transition-colors duration-200"
            >
              Suibhne's Blog
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <article className="max-w-4xl mx-auto">
          <div className="prose prose-lg lg:prose-xl max-w-none">
            {children}
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-off-black/10 dark:border-cream-white/20 bg-cream-white dark:bg-off-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="text-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p className="font-sans text-sm text-off-black/60 dark:text-cream-white/60">
              © 2024 Suibhne's Blog. Built with Next.js and MDX.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 