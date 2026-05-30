import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Digital — Agência de Marketing para Turismo e Hotelaria',
  description: 'Especialistas em transformar negócios de turismo e hotelaria em referências digitais. Branding, web design, social media e performance ads.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
