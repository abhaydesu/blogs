import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.abhaydesu.dev"),
  title: {
    default: "Abhay Singh's Blog",
    template: "%s | Abhay Singh",
  },
  description: "Personal blog by Abhay Singh covering tech, programming, and learning.",
  authors: [{ name: "Abhay Singh", url: "https://abhaydesu.dev" }],
  creator: "Abhay Singh",
  publisher: "Abhay Singh",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.abhaydesu.dev",
    siteName: "Abhay Singh's Blog",
    title: "Abhay Singh's Blog",
    description: "Personal blog by Abhay Singh covering tech, programming, and learning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhay Singh's Blog",
    description: "Personal blog by Abhay Singh covering tech, programming, and learning.",
  },
  alternates: {
    canonical: "https://blog.abhaydesu.dev",
    types: {
      "application/rss+xml": "https://blog.abhaydesu.dev/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=pencerio@50&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=aktura@400&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=nunito@300,301,400,500&display=swap" rel="stylesheet" />
      </head>
      <body className={`${notoSansJp.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

