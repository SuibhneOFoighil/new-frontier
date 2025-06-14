'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Subscribe from '@/components/Subscribe'
import Footer from '@/components/Footer'

export default function SubscribePage() {
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
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-off-black dark:text-cream-white">
            Stay in the Loop
          </h1>
          
          <p className="font-sans text-lg sm:text-xl text-off-black/70 dark:text-cream-white/80 mb-8 leading-relaxed">
            Join our newsletter to receive thoughtful essays and insights exploring the ethical questions 
            at the intersection of technology, capitalism, and human relations delivered directly to your inbox.
          </p>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12"></div>
          
          <Subscribe 
            title="Subscribe to New Frontier"
            description="Get notified when new essays exploring ethics, society, and the future of humanity are published. Quality thought-provoking content only."
          />
          
          <div className="mt-12 pt-8 border-t border-off-black/10 dark:border-cream-white/20">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-4 text-off-black dark:text-cream-white">
              What to Expect
            </h2>
            
            <div className="grid gap-6 sm:gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-jade-teal/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-jade-teal"></div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-off-black dark:text-cream-white mb-1">
                      Ethics & Society
                    </h3>
                    <p className="font-sans text-sm text-off-black/70 dark:text-cream-white/80">
                      Deep explorations of moral questions in our rapidly changing world and their implications for society.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-jade-teal/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-jade-teal"></div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-off-black dark:text-cream-white mb-1">
                      Capitalism & Technology
                    </h3>
                    <p className="font-sans text-sm text-off-black/70 dark:text-cream-white/80">
                      Critical analysis of how economic systems and technological progress shape human relationships and values.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-jade-teal/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-jade-teal"></div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-off-black dark:text-cream-white mb-1">
                      Future of Humanity
                    </h3>
                    <p className="font-sans text-sm text-off-black/70 dark:text-cream-white/80">
                      Thoughtful perspectives on where we&apos;re heading as a species and how we can shape a more ethical future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}