import type { Metadata } from 'next'
import { Shojumaru } from 'next/font/google'
import { Alike_Angular } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const shojumaru = Shojumaru({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-shojumaru'
})

const alikeAngular = Alike_Angular({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-alike-angular'
})

export const metadata: Metadata = {
  title: 'Boy Alone',
  description: 'Minimalist Fashion Brand',
  icons: {
    icon: '/fav.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${shojumaru.variable} ${shojumaru.className} ${alikeAngular.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

