import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impostorgram | Analisis Follower Instagram",
  description:
    "Cek siapa yang tidak followback di Instagram dengan Impostorgram!",
  keywords: ["Instagram", "Unfollow Checker", "Followback", "Impostorgram"],
  authors: [{ name: "Nama Kamu" }],
  openGraph: {
    type: "website",
    url: "https://impostorgram.vercel.app",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
