import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "OctoMedia — Creative production for stories that inspire.",
  description: "Based in Kuwait, producing content that lasts — timeless stories for modern audiences.",
  generator: "v0.app",
  alternates: {
    canonical: "https://octomedia.example/",
  },
  openGraph: {
    siteName: "OctoMedia",
    title: "Creative production for stories that inspire. | OctoMedia",
    description: "Based in Kuwait, producing content that lasts — timeless stories for modern audiences.",
    type: "website",
    url: "https://octomedia.example/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-octomedia.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "OctoMedia creative production — timeless stories for modern audiences",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_KW",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative production for stories that inspire. | OctoMedia",
    description: "Based in Kuwait, producing content that lasts — timeless stories for modern audiences.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-octomedia.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "OctoMedia creative production — timeless stories for modern audiences",
      },
    ],
    site: "@octomedia",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
