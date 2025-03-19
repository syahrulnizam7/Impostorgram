import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impostorgram | Cek Siapa yang Tidak Followback",
  description:
    "Cek siapa yang tidak followback di Instagram dengan Impostorgram!",
  keywords: ["Instagram", "Unfollow Checker", "Followback", "Impostorgram"],
  authors: [{ name: "Alangkun" }],
  openGraph: {
    type: "website",
    url: "https://impostorgram.my.id",
    title: "Impostorgram | Analisis Follower Instagram",
    description:
      "Cek siapa yang tidak followback di Instagram dengan Impostorgram!",
    images: [{ url: "/images/impostorgram.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impostorgram | Analisis Follower Instagram",
    description:
      "Cek siapa yang tidak followback di Instagram dengan Impostorgram!",
    images: ["/images/impostorgram.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
