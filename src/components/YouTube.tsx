'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface YouTubeProps {
  id: string
  title?: string
  className?: string
  autoplay?: boolean
}

export default function YouTube({ id, title = "YouTube Video Player", className = "", autoplay = false }: YouTubeProps) {
  const [embedError, setEmbedError] = useState(false)

  // Build embed URL with mobile-optimized parameters
  const params = new URLSearchParams()
  
  // Essential parameters for mobile compatibility
  params.set('rel', '0') // Don't show related videos
  params.set('modestbranding', '1') // Minimal YouTube branding
  params.set('controls', '1') // Show player controls
  params.set('playsinline', '1') // Play inline on iOS
  params.set('enablejsapi', '0') // Disable JS API to avoid restrictions
  params.set('iv_load_policy', '3') // Hide annotations
  params.set('fs', '1') // Allow fullscreen
  params.set('cc_load_policy', '0') // Hide captions by default
  
  if (autoplay) {
    params.set('autoplay', '1')
    params.set('mute', '1') // Required for autoplay
  }
  
  const embedUrl = `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  const youtubeUrl = `https://www.youtube.com/watch?v=${id}`

  const handleIframeError = () => {
    setEmbedError(true)
  }

  // If there's an embed error, show clickable thumbnail
  if (embedError) {
    return (
      <div className={`my-6 lg:my-8 ${className}`}>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-off-black/10 dark:border-cream-white/20 bg-off-black/5 dark:bg-cream-white/5">
          <a 
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 group block"
          >
            {/* Thumbnail */}
            <Image
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                // Fallback to default thumbnail if maxres fails
                e.currentTarget.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
              }}
            />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              Click to watch
            </div>
            
            {/* YouTube logo */}
            <div className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              YouTube
            </div>
          </a>
        </div>
        
        {/* Video caption/title for accessibility */}
        {title !== "YouTube Video Player" && (
          <p className="font-sans text-xs text-off-black/50 dark:text-cream-white/50 mt-2 text-center italic">
            {title}
          </p>
        )}
      </div>
    )
  }

  // Always render iframe first, let YouTube handle mobile restrictions
  return (
    <div className={`my-6 lg:my-8 ${className}`}>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-off-black/10 dark:border-cream-white/20 bg-off-black/5 dark:bg-cream-white/5">
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onError={handleIframeError}
          style={{ 
            border: 'none',
            outline: 'none'
          }}
        />
      </div>
      
      {/* Video caption/title for accessibility */}
      {title !== "YouTube Video Player" && (
        <p className="font-sans text-xs text-off-black/50 dark:text-cream-white/50 mt-2 text-center italic">
          {title}
        </p>
      )}
    </div>
  )
} 