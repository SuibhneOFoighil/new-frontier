'use client'

import { useEffect, Suspense } from 'react'
import { toast, Toaster } from 'sonner'
import { useSearchParams } from 'next/navigation'

function ToastHandler() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmed = searchParams.get('confirmed')
    const already = searchParams.get('already')
    const error = searchParams.get('error')

    if (confirmed === 'true') {
      if (already === 'true') {
        toast.success('You\'re already subscribed!', {
          description: 'Thanks for your interest in staying updated.',
          duration: 5000,
        })
      } else {
        toast.success('Subscription confirmed!', {
          description: 'You\'ll now receive our latest insights.',
          duration: 5000,
        })
      }
      
      // Clean up URL parameters
      const url = new URL(window.location.href)
      url.searchParams.delete('confirmed')
      url.searchParams.delete('already')
      window.history.replaceState({}, '', url.toString())
    }

    if (error) {
      let errorMessage = 'Something went wrong'
      let errorDescription = 'Please try subscribing again.'

      switch (error) {
        case 'invalid-token':
          errorMessage = 'Invalid confirmation link'
          errorDescription = 'This link may have expired or is invalid.'
          break
        case 'service-unavailable':
          errorMessage = 'Service temporarily unavailable'
          errorDescription = 'Please try again later.'
          break
        case 'subscription-failed':
          errorMessage = 'Subscription failed'
          errorDescription = 'Unable to complete your subscription.'
          break
        case 'confirmation-failed':
          errorMessage = 'Confirmation failed'
          errorDescription = 'There was an error confirming your subscription.'
          break
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 8000,
      })

      // Clean up URL parameters
      const url = new URL(window.location.href)
      url.searchParams.delete('error')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams])

  return null
}

export default function ConfirmationToast() {
  return (
    <>
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>
      <Toaster 
        position="bottom-center"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--jade-teal)',
            borderRadius: '8px',
            fontFamily: 'var(--font-sans)',
          },
          className: 'font-sans',
        }}
      />
    </>
  )
}