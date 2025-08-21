
// app/api/dataProduscts.ts
import { Product } from "@/app/page"; // Importa a interface do arquivo principal

const dataProduscts: Product[] = [
  // Categoria X-Burguer
  { id: 1, name: "X-Burger Clássico", description: "O tradicional com hambúrguer, queijo e salada.", price: 25.00, image: "/burger-cheese.png", category: "x-burguer" },
  { id: 2, name: "X-Burger Bacon", description: "Hambúrguer com queijo, bacon, alface e tomate.", price: 28.00, image: "/burger-cheese.png", category: "x-burguer" },
  { id: 3, name: "X-Burger Bacon", description: "Hambúrguer com queijo, bacon, alface e tomate.", price: 28.00, image: "/burger-cheese.png", category: "x-burguer" },
  { id: 4, name: "X-Burger Bacon", description: "Hambúrguer com queijo, bacon, alface e tomate.", price: 28.00, image: "/burger-cheese.png", category: "x-burguer" },

  // Categoria X-Frangos
  { id: 5, name: "X-Frango Clássico", description: "Frango, maionese e queijo.", price: 28.00, image: "/frangao-tudo.png", category: "x-frangos" },
  { id: 6, name: "X-Frango Bacon", description: "Filé de frango, mussarela, bacon e ovo.", price: 32.00, image: "/X-frangao.png", category: "x-frangos" },
  { id: 7, name: "Frango com Catupiry", description: "Frango desfiado com catupiry e queijo.", price: 30.00, image: "/frango-catupiry.png", category: "x-frangos" },
  { id: 8, name: "Moda da Casa Frango", description: "Frango, presunto, mussarela, bacon, ovo, alface e tomate.", price: 35.00, image: "/frangao-tudo.png", category: "x-frangos" },
  { id: 9, name: "X-Frangão", description: "O maior e mais completo X-Frango da casa.", price: 67.49, image: "/X-frangao.png", category: "x-frangos" },
  { id: 10, name: "Frango Tudo", description: "Frango, presunto, mussarela, bacon, ovo, alface, milho e tomate.", price: 39.99, image: "/frangao-tudo.png", category: "x-frangos" },

  // Categoria Bebidas
  { id: 11, name: "Coca-Cola Lata", description: "Refrigerante Coca-Cola 350ml.", price: 8.00, image: "/coca.png", category: "bebidas" },
  { id: 12, name: "Suco Del Valle", description: "Suco de frutas Del Valle.", price: 8.99, image: "/suco del valle.jpeg", category: "bebidas" },
  { id: 13, name: "Água com Gás", description: "Garrafa de água mineral com gás.", price: 5.00, image: "/Aguá com gás.jpeg", category: "bebidas" },
  { id: 14, name: "Skol Lata", description: "Cerveja Skol em lata 350ml.", price: 8.00, image: "/skol lata.jpeg", category: "bebidas" },
  { id: 15, name: "Brahma Lata", description: "Cerveja Brahma em lata 350ml.", price: 8.00, image: "/Brahma.jpeg", category: "bebidas" },

  //Porções
  { id: 16, name: "Porção de Batata Frita", description: "Batatas fritas crocantes.", price: 50.00, image: "/burger-cheese.png", category: "porcao" },
  { id: 17, name: "Porção de Frango a Passarinho", description: "Frango frito temperado.", price: 60.00, image: "/X-frangao.png", category: "porcao" },
  { id: 18, name: "Porção de Onion Rings", description: "Anéis de cebola empanados e fritos.", price: 55.00, image: "/frango-catupiry.png", category: "porcao" },
];

export default dataProduscts;