import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsentBanner } from "@/components/analytics/cookie-banner";
import { absoluteUrl } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Lovelle – Fun Relationship Quizzes & Games",
    template: "%s | Lovelle",
  },
  description:
    "Discover fun relationship quizzes, couple compatibility tests, and friendship games. Share with your partner or best friend and see how well you really know each other!",
  keywords: [
    "relationship quiz",
    "couple compatibility",
    "love quiz",
    "friendship quiz",
    "how well do you know me",
    "would you rather",
    "couple games",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: "Lovelle",
    title: "Lovelle – Fun Relationship Quizzes & Games",
    description:
      "Discover fun relationship quizzes and games. Share with your partner or best friend!",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lovelle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovelle – Fun Relationship Quizzes & Games",
    description: "Discover fun relationship quizzes and games. Share with your partner or best friend!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-white px-4 py-2 rounded-full text-pink-600 font-semibold shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
