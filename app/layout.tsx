import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Christy & Jimmy's Wedding Camera 📸",
  description: 'Capture memories at our wedding with our disposable camera app!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-wedding-cream">
        {children}
      </body>
    </html>
  )
} 