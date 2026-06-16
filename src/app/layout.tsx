import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Récit : Anton (poster condensé) pour les punchlines géantes.
const fontHeading = Anton({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400'],
})

const fontBody = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cv.wedreamteam.com'),
  title: 'Fayçal ZOUAOUI — Ingénieur Cloud / DevOps · AWS · Kubernetes · Terraform',
  description:
    "Portfolio de missions de Fayçal ZOUAOUI, Ingénieur Cloud & DevOps à Lille. " +
    "Tech Lead DevOps (Waykonect/TotalEnergies), expert AWS, EKS, Terraform, " +
    "GitOps, sécurité & CI/CD. 10+ ans d'expérience.",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: 'https://cv.wedreamteam.com/',
    title: 'Fayçal ZOUAOUI — Ingénieur Cloud / DevOps',
    description:
      "Tech Lead DevOps · AWS · Kubernetes · Terraform · 10+ ans d'expérience",
    siteName: 'Fayçal ZOUAOUI – Portfolio',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Fayçal ZOUAOUI – Ingénieur Cloud / DevOps',
      },
    ],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fayçal ZOUAOUI — Ingénieur Cloud / DevOps',
    description: 'Portfolio de missions Cloud & DevOps',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e8e4db' },
    { media: '(prefers-color-scheme: dark)', color: '#e8e4db' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
