import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import Image from 'next/image'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stephano-Store | Accessoires de Mode',
  description: 'Boutique en ligne d\'accessoires pour hommes et femmes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}