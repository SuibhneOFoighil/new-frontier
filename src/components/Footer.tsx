export default function Footer() {
  return (
    <footer className="border-t border-off-black/10 dark:border-cream-white/20 bg-cream-white dark:bg-off-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
          <p className="font-sans text-sm text-off-black/60 dark:text-cream-white/60">
            © 2025 Molus Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}