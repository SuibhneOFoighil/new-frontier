import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function Logo({ 
  className = '', 
  width = 40, 
  height = 40, 
  priority = false 
}: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Light mode logo (dark logo) */}
      <Image
        src="/logo-off-black.svg"
        alt="New Frontier Logo"
        width={width}
        height={height}
        priority={priority}
        className="block dark:hidden"
      />
      
      {/* Dark mode logo (light logo) */}
      <Image
        src="/logo-cream-white.svg"
        alt="New Frontier Logo"
        width={width}
        height={height}
        priority={priority}
        className="hidden dark:block"
      />
    </div>
  )
} 