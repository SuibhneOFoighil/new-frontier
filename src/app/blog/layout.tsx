'use client'

import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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

      <Footer />
    </div>
  )
} 