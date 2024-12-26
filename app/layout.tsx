import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Indie Hacker Skills Assessment',
  description: 'Help indie hackers assess and visualize their entrepreneurial skills across different dimensions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
