'use client'
import { useState } from 'react'; // Importe o hook useState
import Image from 'next/image'; // Importe o componente Image do Next.js
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Importe o componente Button
// Definição do componente Navbar.
const Navbar = () => {
  // Estado para controlar a visibilidade do menu suspenso.
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Declare e inicialize o estado

  // Função para fechar todos os menus.
  const closeAllMenus = () => {
    setIsMenuOpen(true);
  };
  
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      {/* Seção Esquerda: Logo */}
      <div className="flex items-center space-x-2">
        <Image src="/logo.png"
         alt="Foody Lanches" 
         width={50}
          height={50} 
          />
          <p className='text-sm lg:text-2xl font-bold'>Foody Lanches</p>
          
      </div>

      {/* Seção Direita: Links de Navegação (Desktop) */}
      <div className="hidden md:flex space-x-4">
        <div className="relative">
          <Button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-lg font-semibold text-zinc-400 hover:text-zinc-700 focus:outline-none"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            aria-haspopup="true"
          >
            Cardápio
          </Button>
          {isMenuOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10" role="menu">
               <li role="menuitem"><Link href="/#" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">Home</Link></li>
              <li role="menuitem"><Link href="/frangos" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">X-Frangos</Link></li>
              <li role="menuitem"><Link href="/burguer" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">X-Burguer</Link></li>
              <li role="menuitem"><Link href="/porcoes" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">Porções</Link></li>
              <li role="menuitem"><Link href="/bebidas" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-500">Bebidas</Link></li>
            </ul>
          )}
        </div>
        <Link href="/sobre" onClick={closeAllMenus} className="text-lg font-semibold text-zinc-900 hover:text-zinc-400">
          Sobre Nós
        </Link>
      </div>
    </div>
  );
};

// Exportação padrão do componente.
export default Navbar;