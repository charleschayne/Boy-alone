import type { Metadata } from 'next'
import { Chelsea_Market } from 'next/font/google'
import './globals.css'

const chelseaMarket = Chelsea_Market({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-chelsea'
})

export const metadata: Metadata = {
  title: 'Boy Alone',
  description: 'Minimalist Fashion Brand',
  icons: {
    icon: '/fav.png',
  },
}

import PasswordGate from '@/components/PasswordGate'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${chelseaMarket.variable} ${chelseaMarket.className} antialiased`}>
        <PasswordGate>
          {children}
        </PasswordGate>
      </body>
    </html>
  )
}
