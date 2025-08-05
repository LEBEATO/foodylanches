 
import React, { useState } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones de hambúrguer e fechar

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla o dropdown do Cardápio (desktop e mobile)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Controla a abertura/fechamento do menu mobile completo

  // Dados fixos para o logo e nome da lanchonete
  const title = "Foody Lanches";
  const imagesrc = "/logo.png"; // Certifique-se de que este caminho está correto para sua imagem!

  return (
    <div className="flex justify-between items-center w-full h-30 shadow-lg px-8 relative bg-white">
      {/* Seção Esquerda: Logo e Título */}
      <div className="flex items-center pt-2 space-x-2 md:space-x-4">
        <div>
          {/* Logo: Reduz o tamanho em telas menores */}
          <Image
            src={imagesrc}
            alt="Logo Foody Lanches"
            width={50} // Largura padrão para mobile
            height={40} // Altura padrão para mobile
            className="rounded-full md:w-[70px] md:h-[50px]" // Aumenta em telas médias e maiores
          />
        </div>
        {/* Título: Reduz o tamanho da fonte em telas menores */}
        <span className="text-base font-bold text-zinc-900 md:text-xl">
          {title}
        </span>
      </div>

      {/* Ícone do Hambúrguer para Telas Menores (aparece apenas em mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl text-zinc-700 focus:outline-none"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Seção Direita: Links de Navegação (Desktop) - Esconde em mobile */}
      <div className="hidden md:flex items-center space-x-6 relative">
        {/* Cardápio (Menu) com Dropdown para Desktop */}
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
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">X-Frango</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">X-Burguer</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Porção</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Refrigerante</a>
            </div>
          )}
        </div>

        {/* Sobre Nós link para Desktop */}
        <a href="#" className="text-lg font-semibold text-zinc-800 hover:text-zinc-900">
          Sobre Nós
        </a>
      </div>

      {/* Menu Mobile (Dropdown completo para telas pequenas) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-2 z-20 transition-transform duration-300 ease-in-out transform origin-top">
          {/* O conteúdo do menu mobile agora está DENTRO desta div */}
          <div className="flex flex-col items-center space-y-4 py-4">
            {/* Cardápio (Menu) no Mobile */}
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
                  <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">X-Frango</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">X-Burguer</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">Porção</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500" role="menuitem">Refrigerante</a>
                </div>
              )}
            </div>

            {/* Sobre Nós link no Mobile */}
            <a href="#" className="text-lg font-semibold text-zinc-800 hover:text-zinc-900 w-full text-center py-2 ">
              Sobre Nós
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;