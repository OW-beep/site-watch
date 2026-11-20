import type { Metadata } from "next";
import { Yusei_Magic, Klee_One } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, ADSENSE_CLIENT, GSC_VERIFICATION, GA_ID } from "@/lib/site";
import { PROFILE } from "@/lib/profile";
import "./globals.css";

const yusei = Yusei_Magic({ weight: "400", subsets: ["latin"], variable: "--font-yusei", display: "swap" });
const klee = Klee_One({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-klee", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | ${SITE_TAGLINE}`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { type: "website", locale: "ja_JP", siteName: SITE_NAME, title: `${SITE_NAME} | ${SITE_TAGLINE}`, description: SITE_DESCRIPTION, url: SITE_URL, images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }] },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION, images: ["/og.png"] },
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
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');` }} />
          </>
        )}
      </head>
      <body className={`${yusei.variable} ${klee.variable} font-sans`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION, inLanguage: "ja", publisher: { "@id": `${SITE_URL}/#org` } },
          { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/og.png`, description: SITE_DESCRIPTION, sameAs: ["https://x.com/datascience26"],
            founder: { "@type": "Person", name: `${SITE_NAME} 道場主`, url: `${SITE_URL}/about`, description: "公務員を経てITコンサルタントに転身。データ分析・データ活用の支援が専門。", knowsAbout: PROFILE.usedMethods } },
        ]) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
