import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio de Missions — Fayçal ZOUAOUI',
  description: 'Dossier de compétences / portfolio de missions (Cloud & DevOps)',
  themeColor: '#0ea5e9',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
