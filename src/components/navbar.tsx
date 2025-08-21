 
// src/components/navbar.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

// 1. Defina a interface para as propriedades do Navbar, removendo 'description'
export interface NavbarProps {
  imagesrc: string;
  title: string;
}

// 2. Modifique o componente para receber e usar as props
const Navbar: React.FC<NavbarProps> = ({ imagesrc, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null); 

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center w-full h-30 shadow-lg px-8 bg-white fixed top-0 inset-x-0 z-50" ref={menuRef}>
      {/* Seção Esquerda: Logo e Título */}
      <div className="flex items-center pt-2 space-x-2 md:space-x-4">
        <div>
          <Image
            src={imagesrc} // Usa a prop imagesrc
            alt={title}   // Usa a prop title
            width={50}
            height={40}
            className="rounded-full md:w-[70px] md:h-[50px]"
          />
        </div>
        <span className="text-base font-bold text-zinc-900 md:text-xl">
          {title} 
        </span>
      </div>

      {/* Ícone do Hambúrguer para Telas Menores */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl text-zinc-700 focus:outline-none"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Seção Direita: Links de Navegação (Desktop) */}
      <div className="hidden md:flex items-center space-x-6 relative">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-lg font-semibold text-zinc-700 hover:text-zinc-900 focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            Cardápio
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10" role="menu">
              <Link href="/xfrangos" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">X-Frango</Link>
              <Link href="/burguer" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">X-Burguer</Link>
              <Link href="/porcoes" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">Porções</Link>
              <Link href="/bebidas" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">Bebidas</Link>
            </div>
          )}
        </div>
        <Link href="/sobre" onClick={closeAllMenus} className="text-lg font-semibold text-zinc-800 hover:text-zinc-900">
          Sobre Nós
        </Link>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-2 z-20 transition-transform duration-300 ease-in-out transform origin-top">
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-full text-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-lg font-semibold text-zinc-800 hover:text-zinc-900 focus:outline-none w-full py-2"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                Cardápio
              </button>
              {isMenuOpen && (
                <div className="mt-2 bg-gray-100 rounded-md py-1" role="menu">
                  <Link href="/xfrangos" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">X-Frango</Link>
                  <Link href="/burguer" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">X-Burguer</Link>
                  <Link href="/porcoes" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">Porções</Link>
                  <Link href="/bebidas" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">Bebidas</Link>
                </div>
              )}
            </div>
            <Link href="/sobre" onClick={closeAllMenus} className="text-lg font-semibold text-zinc-800 hover:text-zinc-900 w-full text-center py-2 ">
              Sobre Nós
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;