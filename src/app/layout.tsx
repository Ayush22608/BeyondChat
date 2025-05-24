import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BeyondChats Admin Panel',
  description: 'Modern customer support and chatbot management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gradient-to-br from-blue-50 via-indigo-100 to-emerald-50 bg-fixed`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
} 