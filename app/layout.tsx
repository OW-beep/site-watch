import type { Metadata } from "next";
import { Yusei_Magic, Klee_One } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, ADSENSE_CLIENT, GSC_VERIFICATION } from "@/lib/site";
import "./globals.css";

const yusei = Yusei_Magic({ weight: "400", subsets: ["latin"], variable: "--font-yusei", display: "swap" });
const klee = Klee_One({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-klee", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | ${SITE_TAGLINE}`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { type: "website", locale: "ja_JP", siteName: SITE_NAME, title: `${SITE_NAME} | ${SITE_TAGLINE}`, description: SITE_DESCRIPTION, url: SITE_URL },
  twitter: { card: "summary", title: SITE_NAME, description: SITE_DESCRIPTION },
  verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
  other: ADSENSE_CLIENT ? { "google-adsense-account": ADSENSE_CLIENT } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {ADSENSE_CLIENT && (
          <script async crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} />
        )}
      </head>
      <body className={`${yusei.variable} ${klee.variable} font-sans`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
