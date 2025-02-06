"use client";

import { ShoppingBag, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image'; // Importation du composant Image

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Image
            src="/images/logo.png" // Chemin vers le logo
            alt="Logo de Stephano-Store"
            width={50} // Ajustez la taille
            height={50} // Ajustez la taille
          />
          <Link href="/" className="text-2xl font-bold">
            Stephano-Store
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Accueil
            </Link>
            <Link href="/hommes" className="text-sm font-medium hover:text-primary">
              Hommes
            </Link>
            <Link href="/femmes" className="text-sm font-medium hover:text-primary">
              Femmes
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/panier">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Accueil
            </Link>
            <Link href="/hommes" className="text-sm font-medium hover:text-primary">
              Hommes
            </Link>
            <Link href="/femmes" className="text-sm font-medium hover:text-primary">
              Femmes
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}