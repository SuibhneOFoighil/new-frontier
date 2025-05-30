import Image from "next/image";
import Link from "next/link";
import Logo from "./components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-white dark:bg-off-black transition-colors duration-300 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <main className="max-w-4xl mx-auto text-center py-6 sm:py-12 lg:py-20">
          {/* Hero Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16 px-2 sm:px-0">
            <h1 className="font-serif text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-6 lg:mb-8 text-off-black dark:text-cream-white leading-tight">
              <span className="block mb-3 sm:mb-0 sm:inline text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Welcome to</span>{" "}
              <span className="text-orange-red dark:text-orange-red flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3 lg:gap-4 mt-2 sm:mt-0">
                <Logo width={48} height={48} priority={true} className="sm:order-1" />
                <span className="sm:order-2 text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Molus</span>
              </span>
            </h1>
            <p className="font-sans text-lg sm:text-lg md:text-xl lg:text-2xl text-off-black/70 dark:text-cream-white/80 mb-8 sm:mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              A place for thoughts, ideas, and technical explorations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 md:gap-6 items-center justify-center mb-10 sm:mb-12 lg:mb-16 px-4 sm:px-0">
            <Link
              className="w-full sm:w-auto font-sans font-semibold px-8 sm:px-8 py-4 sm:py-4 bg-orange-red hover:bg-orange-red/90 active:bg-orange-red/95 text-cream-white rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98] sm:hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-red focus:ring-offset-2 focus:ring-offset-cream-white dark:focus:ring-offset-off-black touch-manipulation min-h-[52px] flex items-center justify-center text-lg"
              href="/blog"
            >
              <span>📝 Read the Blog</span>
            </Link>
          </div>

          {/* Content Themes */}
          <div className="mb-8 sm:mb-8 lg:mb-12 px-4 sm:px-0">
            <p className="font-sans text-sm sm:text-sm md:text-base text-off-black/60 dark:text-cream-white/60 mb-4 sm:mb-4">
              Exploring the intersection of institutions, politics, and society
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-3 md:gap-4 max-w-md mx-auto">
              <span className="font-mono text-sm px-3 sm:px-3 py-2 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20 whitespace-nowrap">
                Institutional Analysis
              </span>
              <span className="font-mono text-sm px-3 sm:px-3 py-2 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20 whitespace-nowrap">
                Political Commentary
              </span>
              <span className="font-mono text-sm px-3 sm:px-3 py-2 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20 whitespace-nowrap">
                Social Justice
              </span>
              <span className="font-mono text-sm px-3 sm:px-3 py-2 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20 whitespace-nowrap">
                Higher Education
              </span>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </main>
      </div>
    </div>
  );
}
