import Link from 'next/link'
import Logo from './Logo'

interface HeaderProps {
  showBackButton?: boolean
  onBackClick?: () => void
  className?: string
}

export default function Header({ 
  showBackButton = false, 
  onBackClick,
  className = ''
}: HeaderProps) {
  return (
    <header className={`border-b border-off-black/10 dark:border-cream-white/20 bg-cream-white/80 dark:bg-off-black/80 backdrop-blur-sm sticky top-0 z-10 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {showBackButton && onBackClick ? (
            <button 
              onClick={onBackClick}
              className="font-sans text-sm sm:text-base text-jade-teal hover:text-orange-red transition-colors duration-200 flex items-center"
            >
              ← Back
            </button>
          ) : (
            <div></div>
          )}
          
          <Link 
            href="/" 
            className="flex items-center gap-2 font-serif text-base sm:text-lg font-bold text-off-black dark:text-cream-white hover:text-orange-red dark:hover:text-orange-red transition-colors duration-200"
          >
            <Logo width={24} height={24} />
            <span>Molus Blog</span>
          </Link>
        </div>
      </div>
    </header>
  )
} 