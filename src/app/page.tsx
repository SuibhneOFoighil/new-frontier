import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-white dark:bg-off-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <main className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12 lg:mb-16">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8 text-off-black dark:text-cream-white leading-tight">
              Welcome to{" "}
              <span className="text-orange-red dark:text-orange-red">
                Suibhne's
              </span>{" "}
              Blog
            </h1>
            <p className="font-sans text-lg sm:text-xl lg:text-2xl text-off-black/70 dark:text-cream-white/80 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
              A place for thoughts, ideas, and technical explorations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-12 lg:mb-16">
            <Link
              className="w-full sm:w-auto font-sans font-semibold px-8 py-4 bg-orange-red hover:bg-orange-red/90 text-cream-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-red focus:ring-offset-2 focus:ring-offset-cream-white dark:focus:ring-offset-off-black"
              href="/blog"
            >
              📝 Read the Blog
            </Link>
            <a
              className="w-full sm:w-auto font-sans font-medium px-8 py-4 border-2 border-jade-teal text-jade-teal hover:bg-jade-teal hover:text-cream-white dark:hover:text-off-black rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jade-teal focus:ring-offset-2 focus:ring-offset-cream-white dark:focus:ring-offset-off-black"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js Docs
            </a>
          </div>

          {/* Tech Stack */}
          <div className="mb-12 lg:mb-16">
            <p className="font-sans text-sm sm:text-base text-off-black/60 dark:text-cream-white/60 mb-4">
              Built with modern web technologies
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <span className="font-mono text-xs sm:text-sm px-3 py-1 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20">
                Next.js 15
              </span>
              <span className="font-mono text-xs sm:text-sm px-3 py-1 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20">
                MDX
              </span>
              <span className="font-mono text-xs sm:text-sm px-3 py-1 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20">
                Tailwind CSS
              </span>
              <span className="font-mono text-xs sm:text-sm px-3 py-1 bg-off-black/5 dark:bg-cream-white/10 text-off-black dark:text-cream-white rounded-full border border-off-black/10 dark:border-cream-white/20">
                TypeScript
              </span>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </main>

        {/* Footer */}
        <footer className="mt-16 lg:mt-24 pt-8 border-t border-off-black/10 dark:border-cream-white/20">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm">
            <a
              className="font-sans flex items-center gap-2 text-off-black/60 dark:text-cream-white/60 hover:text-jade-teal dark:hover:text-jade-teal transition-colors duration-200"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
                className="dark:invert"
              />
              Learn
            </a>
            <a
              className="font-sans flex items-center gap-2 text-off-black/60 dark:text-cream-white/60 hover:text-jade-teal dark:hover:text-jade-teal transition-colors duration-200"
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
                className="dark:invert"
              />
              Examples
            </a>
            <a
              className="font-sans flex items-center gap-2 text-off-black/60 dark:text-cream-white/60 hover:text-jade-teal dark:hover:text-jade-teal transition-colors duration-200"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
                className="dark:invert"
              />
              Go to nextjs.org →
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
