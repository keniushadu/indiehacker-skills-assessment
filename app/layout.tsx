import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Indie Hacker Skills Assessment',
  description: 'Help indie hackers assess and visualize their entrepreneurial skills across different dimensions.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800`}>
        <div className="relative min-h-screen">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-cyan-100/20 dark:from-purple-900/30 dark:via-transparent dark:to-cyan-900/30" />
          
          {/* 主要内容 */}
          <main className="relative isolate">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
              {children}
            </div>
          </main>

          {/* 页脚 */}
          <footer className="relative mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Made with ❤️ for Indie Hackers</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
