import type { Metadata } from 'next'
import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'

const dmSans = DM_Sans({ subsets: ['latin'] as any, variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] as any, variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Sunoff — Профессиональная тонировка автомобилей в Минске',
  description: 'Sunoff Garage — студия тонировки автомобилей в Минске. Тонирование стёкол, бронирование плёнкой, растонировка. Качественные материалы, гарантия на работы.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Sunoff — Профессиональная тонировка автомобилей в Минске',
    description: 'Студия тонировки автомобилей в Минске. Тонирование стёкол, бронирование, растонировка.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans bg-black text-white`}>
        {children}
        <Toaster />
        <ChunkLoadErrorHandler />
      </body>
    </html>
  )
}
