import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ali & Zahraa | علي وزهراء — 6 October 2026",
  description: "The bilingual Katb Kteb invitation of Ali and Zahraa",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ar_LB",
    alternateLocale: ["en_US"],
    title: "علي وزهراء — ٦ تشرين الأول ٢٠٢٦",
    description: "دعوة كتب كتاب علي وزهراء",
    images: [
      {
        url: "/whatsapp-cover.png",
        width: 304,
        height: 554,
        alt: "دعوة كتب كتاب علي وزهراء",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "علي وزهراء — ٦ تشرين الأول ٢٠٢٦",
    description: "دعوة كتب كتاب علي وزهراء",
    images: ["/whatsapp-cover.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Pinyon+Script&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
