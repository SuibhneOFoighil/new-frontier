'use client'

import React, { useState } from 'react'

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
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    
    try {
      // TODO: Replace with your actual newsletter signup endpoint
      // For now, we'll simulate a successful signup
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('success')
      setMessage('Thanks for subscribing! Check your email for confirmation.')
      setEmail('')
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 rounded-lg border border-off-black/20 dark:border-cream-white/30 bg-cream-white dark:bg-off-black/50 text-off-black dark:text-cream-white placeholder-off-black/50 dark:placeholder-cream-white/50 font-sans text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-jade-teal focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-jade-teal hover:bg-orange-red text-cream-white font-sans font-medium text-sm sm:text-base rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-jade-teal focus:ring-offset-2 dark:focus:ring-offset-off-black whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {message && (
              <p className={`text-sm font-sans ${
                status === 'success' 
                  ? 'text-jade-teal dark:text-jade-teal' 
                  : 'text-orange-red dark:text-orange-red'
              }`}>
                {message}
              </p>
            )}
          </form>
          
          <p className="font-sans text-xs text-off-black/50 dark:text-cream-white/50 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
} 