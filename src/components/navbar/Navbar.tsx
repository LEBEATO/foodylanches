// src/components/Navbar.tsx

"use client"; 

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center relative">
      {/* Logo e nome do site */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Foody Lanches"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
        <Link href="/">
          <h1 className="text-xl font-bold ml-2">Foody Lanches</h1>
        </Link>
      </div>

      {/* Navegação principal para desktop */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Você pode transformar isso em um menu dropdown também, se quiser */}
        <Link href="/frangos" className="text-lg font-semibold text-zinc-800 hover:text-zinc-900">
          Cardápio
        </Link>
        <Link href="/sobre" className="text-lg font-semibold text-zinc-800 hover:text-zinc-900">
          Sobre Nós
        </Link>
      </div>

      {/* Botão do menu mobile (oculto em desktop) */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2"
        aria-label="Toggle mobile menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md rounded-md p-4 z-50">
          <div className="w-full text-center">
            {/* O "Cardápio" agora é um botão que expande a lista */}
            <Button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-lg font-semibold text-zinc-400 hover:text-zinc-500 focus:outline-none w-full py-2"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              aria-haspopup="true"
            >
              Cardápio
            </Button>
            {/* A lista de itens do cardápio que aparece/desaparece */}
            {isMenuOpen && (
              <ul className="mt-2 bg-gray-100 rounded-md py-1" role="menu">
                <li role="menuitem"><Link href="/frangos" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">X-Frangos</Link></li>
                <li role="menuitem"><Link href="/burguer" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">X-Burguer</Link></li>
                <li role="menuitem"><Link href="/porcoes" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">Porções</Link></li>
                <li role="menuitem"><Link href="/bebidas" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">Bebidas</Link></li>
              </ul>
            )}
            <Link href="/sobre" onClick={closeAllMenus} className="text-lg font-semibold text-zinc-800 hover:text-zinc-900 w-full text-center py-2 ">
              Sobre Nós
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;