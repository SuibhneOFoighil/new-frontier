'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Subscribe from '@/components/Subscribe'
import Footer from '@/components/Footer'
import ConfirmationToast from '@/components/ConfirmationToast'

export default function SubscribePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-cream-white dark:bg-off-black transition-colors duration-300">
      <ConfirmationToast />
      
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
            Join our newsletter to get the latest insights on AI-driven software development, 
            technical deep-dives, and thought-provoking explorations delivered directly to your inbox.
          </p>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12"></div>
          
          <Subscribe 
            title="Subscribe to Molus Blog"
            description="Get notified when new articles about AI-driven software development are published. No spam, quality content only."
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
                      Technical Deep Dives
                    </h3>
                    <p className="font-sans text-sm text-off-black/70 dark:text-cream-white/80">
                      In-depth explorations of cutting-edge development practices and AI integration strategies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-jade-teal/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-jade-teal"></div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-off-black dark:text-cream-white mb-1">
                      Future of Development
                    </h3>
                    <p className="font-sans text-sm text-off-black/70 dark:text-cream-white/80">
                      Thoughts and predictions on how AI will reshape software engineering workflows.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-jade-teal/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-jade-teal"></div>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-off-black dark:text-cream-white mb-1">
                      Practical Insights
                    </h3>
                    <p className="font-sans text-sm text-off-black/70 dark:text-cream-white/80">
                      Real-world applications and lessons learned from building with AI-powered tools.
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