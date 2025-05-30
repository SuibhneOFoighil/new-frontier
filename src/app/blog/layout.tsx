'use client'

import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import Logo from '../components/Logo'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-cream-white dark:bg-off-black transition-colors duration-300">
      {/* Navigation */}
      <Header 
        showBackButton={true} 
        onBackClick={() => router.back()} 
      />
      
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
              © 2024 Molus Blog. Built with Next.js and MDX.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 