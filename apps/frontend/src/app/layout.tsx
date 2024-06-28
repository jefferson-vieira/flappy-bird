import type { Metadata } from 'next';
import { VT323 } from 'next/font/google';
import './globals.css';
import { GameProvider } from '@/data/context/game';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Flappy Bird Limpo',
  description: 'Flappy Bird com Arquitetura Limpa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GameProvider>
        <body className={vt323.className}>{children}</body>
      </GameProvider>
    </html>
  );
}
