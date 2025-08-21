
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {IconCircleArrowLeftFilled, IconMinus, IconPlus, IconShoppingCartCopy, IconShoppingCartX} from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Assumindo que você pretendia usar Textarea em algum lugar para observações

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItems = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [fields, setFields] = useState({
    name: '',
    lastName: '',
    phone: '',
    street: '',
    neighborhood: '',
    number: '',
    observations: '',
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

const handleIncrement = (id: number) => {
  const updatedCart = cart.map(item => item.id === id ? {...item, quantity: item.quantity + 1 }: item);
  setCart(updatedCart);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}

const handleDecrement = (id: number) => {
  const existingProduct = cart.find(item => item.id === id);
  if(existingProduct && existingProduct.quantity > 1) {
    const updatedCart = cart.map(item => item.id === id ? {...item, quantity: item.quantity - 1 }: item);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }else if(existingProduct && existingProduct.quantity === 1) {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
}

//whatsapp//

const handleWhatsOrderApp = () => {
  // Descomente e ajuste se quiser impor o horário de funcionamento
  // if (!isOpen()) {
  //   alert('Desculpe, Fechado no momento, atendemos de segunda á domingo das 18:00 as 00:00');
  //   return;
  // }

  
  if (!fields.name || !fields.lastName || !fields.phone || !fields.street || !fields.neighborhood || !fields.number) {
    alert('Preencha todos os campos obrigatórios');
    return;
  }

  // Sintaxe do template literal corrigida (faltando crases de fechamento)
  const orderMessage = cart.map(item => `${item.name} (Qtd: ${item.quantity})`).join('\n');
  const fieldsMessage = `Nome: ${fields.name}, Sobrenome: ${fields.lastName}, whatsapp: ${fields.phone}, Rua: ${fields.street}, Bairro: ${fields.neighborhood}, Número: ${fields.number}, Observações: ${fields.observations}`;

  const customerMessage = `Pedido:\n${orderMessage}\nTotal:R$:${total.toFixed(2)}\nDados do Cliente:\n${fieldsMessage}`;
  const whatsappUrl = `https://wa.me/35992640014?text=${encodeURIComponent(customerMessage)}`;
  window.location.href = whatsappUrl;
}

  const router = useRouter();
  const backToHome = () => {
    router.push('/');
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-1 bg-slate-950 w-full p-2 md:p-4 ">
        <button onClick={backToHome} className="flex items-center gap-1 text-white">
          <IconCircleArrowLeftFilled size={50} color='#ffdd'/>
          <p className="text-zinc-100">Voltar</p>
        </button>
        <div className="flex sm:flex-row items-center p-2 gap-4 md:mx-auto">
          <IconShoppingCartCopy size={40} color='white'/>
           <h1 className="text-lg md:text-xl font-bold text-zinc-100">Meu Carrinho</h1>
</div>
      </div>
      {cart.length === 0 ? (
        <div className='flex flex-col items-center justify-center w-full h-screen mx-auto'> {/* Adicionado flex-col para centralização vertical de texto e ícone */}
          <p className='font-bold text-lg md:text-xl mb-10 text-zinc-800'>Seu carrinho está vazio</p> {/* Aumentada a margem inferior para espaçamento */}
          <IconShoppingCartX className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48" stroke={1} color='gray' />
        </div>
      ) : (
      <div className='space-y-6'>
          {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-around py-6 px-6 border-b rounded-md hover:bg-zinc-50 duration-75 transition-colors"> {/* Classe hover corrigida */}
            <img src={item.image} width={100} alt={item.name} />
            <div className='flex flex-col items-center ml-3'>
            <span className='text-center text-zinc-600 font-bold' >{item.name} (Qtd: {item.quantity})</span>
            <span className='text-red-400 font-bold '>R${(item.price * item.quantity).toFixed(2)}</span>

            <div className='gap-1 flex justify-around items-center bg-zinc-400 rounded-full'>
              <button onClick={()=> handleDecrement(item.id)} className='w-[40px] pl-2 hover:bg-blue-500 duration-75 transition-colors rounded-full mr-1'>
                <IconMinus size={20} stroke={1} color='blue'/>
              </button>
                  <span className='text-zinc-400 '>|</span>
              <button onClick={()=> handleIncrement(item.id)} className='w-[40px] pl-2 mr-1 bg-green-300 rounded-full hover:bg-green-500 duration-75 transition-colors'>
                <IconPlus size={20} stroke={1} color='red' />
              </button>
            </div>
            </div>
          </div>

          ))}
              <div className='md-6 ml-4 mr-4 space-y-4'> {/* Adicionado space-y-4 para espaçamento vertical consistente */}
            <h2 className='flex items-center justify-center font-bold text-lg text-zinc-700 mb-4'>Dados de Entrega</h2>

            <div className='grid gap-2'>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder='Seu nome'
                value={fields.name}
                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                className='w-full'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input
                id="lastName"
                type="text"
                placeholder='Seu sobrenome'
                value={fields.lastName}
                onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
                className='w-full'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel" // Use 'tel' para números de telefone para um teclado móvel melhor
                placeholder='(XX) XXXXX-XXXX'
                value={fields.phone}
                onChange={(e) => setFields({ ...fields, phone: e.target.value })}
                className='w-full'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                type="text"
                placeholder='Sua rua'
                value={fields.street}
                onChange={(e) => setFields({ ...fields, street: e.target.value })}
                className='w-full'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                type="text"
                placeholder='Seu bairro'
                value={fields.neighborhood}
                onChange={(e) => setFields({ ...fields, neighborhood: e.target.value })}
                className='w-full'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                type="text"
                placeholder='Número da casa/apto'
                value={fields.number}
                onChange={(e) => setFields({ ...fields, number: e.target.value })}
                className='w-full'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor="observations">Observações (opcional)</Label>
              <Textarea
                id="observations"
                placeholder='Ex: Perto do prédio azul, sem cebola, etc.'
                value={fields.observations}
                onChange={(e) => setFields({ ...fields, observations: e.target.value })}
                className='w-full'
              />
            </div>

            <div className='flex flex-col items-center mt-6'>
              <span className='text-xl md:text-2xl font-bold text-green-500 mb-4'>Total: R$ {total.toFixed(2)}</span>
              <button
                onClick={handleWhatsOrderApp}
                className='bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-200'
              >
                Finalizar Pedido via WhatsApp
              </button>
            </div>
          </div>
          </div>
      )}
    </div>
  );
}

export default CartItems;

