import React from 'react'

interface SubscribeProps {
  className?: string
  title?: string
  description?: string
}

export default function Subscribe({ 
  className = "",
  title = "Subscribe for Updates",
  description = "Get notified when new articles are published"
}: SubscribeProps) {
  return (
    <div className={`my-8 lg:my-12 ${className}`}>
      <div className="bg-gradient-to-r from-jade-teal/10 to-gold/10 dark:from-jade-teal/20 dark:to-gold/20 border border-jade-teal/20 dark:border-jade-teal/30 rounded-lg p-6 sm:p-8">
        <div className="text-center max-w-md mx-auto">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-3 text-off-black dark:text-cream-white">
            {title}
          </h3>
          <p className="font-sans text-sm sm:text-base mb-6 text-off-black/70 dark:text-cream-white/80">
            {description}
          </p>
          
          <form
            action="https://buttondown.com/api/emails/embed-subscribe/suibhneofoighil"
            method="post"
            className="embeddable-buttondown-form space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-off-black/20 dark:border-cream-white/30 bg-cream-white dark:bg-off-black/50 text-off-black dark:text-cream-white placeholder-off-black/50 dark:placeholder-cream-white/50 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-jade-teal focus:border-transparent transition-all duration-200"
              />
              <input type="hidden" value="1" name="embed" />
              <button
                type="submit"
                className="px-6 py-3 bg-jade-teal hover:bg-orange-red text-cream-white font-sans font-medium text-sm sm:text-base rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jade-teal focus:ring-offset-2 dark:focus:ring-offset-off-black whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>
          
          <p className="font-sans text-xs text-off-black/50 dark:text-cream-white/50 mt-4">
            No spam, unsubscribe at any time. Powered by{' '}
            <a
              href="https://buttondown.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-jade-teal hover:text-orange-red transition-colors"
            >
              Buttondown
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 