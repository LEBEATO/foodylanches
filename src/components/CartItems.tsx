'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { IconCircleArrowLeftFilled, IconMinus, IconPlus, IconShoppingCartX } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const CartItems = () => {
  const { cart, incrementQuantity, decrementQuantity } = useCart();
  const router = useRouter();

  const [fields, setFields] = useState({
    name: '',
    lastName: '',
    phone: '',
    street: '',
    neighborhood: '',
    number: '',
    observations: '',
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const backToHome = () => {
    router.push('/');
  }

const handleWhatsOrderApp = () => {
    if (!fields.name || !fields.lastName || !fields.phone || !fields.street || !fields.neighborhood || !fields.number) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    const orderMessage = cart.map(item => `${item.name} (Qtd: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const fieldsMessage = `Nome: ${fields.name}\nSobrenome: ${fields.lastName}\nWhatsApp: ${fields.phone}\nRua: ${fields.street}\nBairro: ${fields.neighborhood}\nNúmero: ${fields.number}\nObservações: ${fields.observations}`;
    
    const customerMessage = `Olá, gostaria de fazer um pedido:\n\n*Pedido:*\n${orderMessage}\n\n*Total:* R$${total.toFixed(2)}\n\n*Dados do Cliente:*\n${fieldsMessage}`;
    const whatsappUrl = `https://wa.me/35992640014?text=${encodeURIComponent(customerMessage)}`;
    window.open(whatsappUrl, '_blank');
}

  return (
    <div>
      <div className="flex items-center justify-center gap-1 bg-slate-950 w-full p-2 md:p-4 ">
        <Button onClick={backToHome} className="flex items-center gap-1 text-white">
          <IconCircleArrowLeftFilled size={50} color='#ffdd' />
          <p className="text-zinc-100">Voltar</p>
        </Button>
        <div className="flex sm:flex-row items-center p-2 gap-4 md:mx-auto">
          <h1 className="text-lg md:text-xl font-bold text-zinc-100">Meu Carrinho</h1>
        </div>
      </div>
      {cart.length === 0 ? (
        <div className='flex flex-col items-center justify-center w-full h-screen mx-auto'>
          <p className='font-bold text-lg md:text-xl mb-10 text-zinc-800'>Seu carrinho está vazio</p>
          <IconShoppingCartX className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48" stroke={1} color='gray' />
        </div>
      ) : (
        <div className='space-y-6 pt-10 px-4'>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-around py-6 px-6 border-b rounded-md hover:bg-zinc-50 duration-75 transition-colors">
              <Image src={item.image} width={100} height={100} alt={item.name} />
              <div className='flex flex-col items-center ml-3'>
                <span className='text-center text-zinc-600 font-bold'>{item.name}</span>
                <span className='text-red-400 font-bold'>R${(item.price * item.quantity).toFixed(2)}</span>
                <div className='gap-1 flex justify-around items-center bg-zinc-400 rounded-full mt-2'>
                  <Button onClick={() => decrementQuantity(item.id)} className='w-[40px] pl-2 hover:bg-blue-500 duration-75 transition-colors rounded-full mr-1'>
                    <IconMinus size={20} stroke={1} color='blue' />
                  </Button>
                  <span className='text-zinc-400'>|</span>
                  <Button onClick={() => incrementQuantity(item.id)} className='w-[40px] pl-2 mr-1 bg-green-300 rounded-full hover:bg-green-500 duration-75 transition-colors'>
                    <IconPlus size={20} stroke={1} color='red' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
            <div className='md-6 ml-4 mr-4 space-y-4'>
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
                  type="tel"
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
                <Button
                  onClick={handleWhatsOrderApp}
                  className='bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-200'
                >
                  Finalizar Pedido via WhatsApp
                </Button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

export default CartItems;