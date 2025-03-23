import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/lib/AuthContext"
import type React from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <Navbar />
            {children}
            <LoadingSpinner />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
