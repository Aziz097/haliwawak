import type { Metadata } from 'next';
import { Inter, Playfair_Display, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eduwisata Polinator — Situs Purbakala Pugung Raharjo',
  description:
    'Sistem Informasi Eduwisata Polinator. Temukan keanekaragaman kupu-kupu dan perannya dalam ketahanan pangan di Situs Purbakala Pugung Raharjo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
