import type { Metadata } from "next";
import { EB_Garamond, Lato, Fira_Code } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "New Frontier - Thoughts on Ethics, Society & the Future of Humanity",
    template: "%s | New Frontier"
  },
  description: "Thoughts, ideas, and technical explorations on the future of software development. A blog by Suibhne focused on modern web technologies, programming insights, and technical innovation.",
  keywords: ["software development", "web development", "programming", "technology", "blog", "technical writing"],
  authors: [{ name: "Suibhne" }],
  creator: "Suibhne",
  publisher: "New Frontier",
  metadataBase: new URL("https://newfrontier.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newfrontier.app",
    title: "New Frontier - Thoughts on Ethics, Society & the Future of Humanity",
    description: "Thoughts, ideas, and technical explorations on the future of software development.",
    siteName: "New Frontier",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "New Frontier Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Frontier - Thoughts on Ethics, Society & the Future of Humanity",
    description: "Thoughts, ideas, and technical explorations on the future of software development.",
    images: ["/logo.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.jpeg", sizes: "32x32", type: "image/jpeg" },
    ],
    apple: "/logo.jpeg",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${ebGaramond.variable} ${lato.variable} ${firaCode.variable} antialiased bg-cream-white dark:bg-off-black text-off-black dark:text-cream-white transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
