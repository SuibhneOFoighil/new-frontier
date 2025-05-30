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
  title: "Molus Blog",
  description: "A place for thoughts, ideas, and technical explorations.",
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
