
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IconCircleArrowLeftFilled } from "@tabler/icons-react"; 

export default function AboutPage() {

    const whatsappUrl = "https://wa.me/5535992640014";
    const phoneNumber = "(35) 99264-0014";
    const address = "Av João Pinheiro, 3000, Bairro Nobre, Luiz";

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 p-8 pt-4">
                <Link href="/" className="flex items-center gap-1">
                  <IconCircleArrowLeftFilled size={50} color='#272626'/>
                  <span className="text-zinc-900 font-bold">Voltar</span>
                </Link>
            </div>
            
            <Head>
                <title>Sobre Nós | Foody Lanches</title>
                <meta name="description" content="Conheça a história e os princípios da Foody Lanches, uma lanchonete apaixonada por hambúrgueres artesanais." />
            </Head>

            <main className="bg-gray-50 text-gray-800">
                {/* Seção 1: Hero Section com Título e Slogan */}
                <section className="relative h-72 md:h-[300px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center p-4">
                            <h1 className="text-4xl md:text-7xl font-extrabold text-white animate-fade-in-down">
                                Bem-vindo à Foody Lanches
                            </h1>
                            <p className="mt-4 text-lg md:text-2xl text-white max-w-2xl font-light italic animate-fade-in-up">
                                Mais que um hambúrguer, uma experiência memorável.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Seção 2: História (Texto + Imagem) */}
                <section className="container mx-auto py-16 px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa História</h2>
                            <p className="text-base md:text-lg leading-relaxed text-gray-600">
                                Fundada com a paixão pela boa comida e pelo convívio, nossa lanchonete nasceu do sonho de oferecer um espaço acolhedor onde amigos e famílias podem se reunir. Inspirados pela rica cultura dos hambúrgueres, desenvolvemos receitas que combinam tradição e inovação, resultando em criações únicas que vão deixar você querendo mais.
                            </p>
                        </div>
                        <div className="relative h-74 md:h-[500px] w-full overflow-hidden rounded-lg shadow-xl animate-fade-in-right">
                            <Image
                                src="/logo.png"
                                alt="Foto do interior da lanchonete Foody Lanches, com ambiente aconchegante"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </section>
                {/* Seção 3: Nossos Princípios (Cards em Grid) */}
                <section className="bg-white py-16 px-4 md:px-8">
                    <div className="container mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nossos Princípios</h2>
                        <div className="grid md:grid-cols-3 gap-8">

                   <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100">
                                <h3 className="text-xl font-semibold mb-2">1. Qualidade</h3>
                                <p className="text-gray-600">
                                    Selecionamos os melhores ingredientes, sempre frescos e locais, para garantir que cada hambúrguer seja uma obra-prima.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100">
                                <h3 className="text-xl font-semibold mb-2">2. Sabor</h3>
                                <p className="text-gray-600">
                                    Nossos chefs experimentam e inovam, garantindo que cada prato ofereça uma explosão de sabores.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100">
                                <h3 className="text-xl font-semibold mb-2">3. Comunidade</h3>
                                <p className="text-gray-600">
                                    Acreditamos no poder da comunidade. Queremos ser mais que uma lanchonete; queremos ser um ponto de encontro.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção 4: Call to Action Final */}
                <section className="bg-gradient-to-r from-yellow-500 to-orange-500 py-16 px-4 md:px-8 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Venha nos Visitar!</h2>
                    <p className="text-lg md:text-xl font-light mb-8">
                        Estamos ansiosos para recebê-lo. Venha experimentar a paixão que colocamos em cada prato e descubra por que somos a escolha favorita da comunidade.
                    </p>
                    
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-2xl font-bold mb-4">Entre em Contato</h3>
                        
                        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-4 md:space-y-0">
                            
                            {/* Número de Celular com Link do WhatsApp */}
                            <div className="flex items-center space-x-2">
                                {/* Ícone de Telefone */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <a 
                                    href={whatsappUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-lg font-medium text-white hover:text-green-300 transition-colors"
                                >
                                    {phoneNumber}
                                </a>
                            </div>

                            {/* Endereço */}

<<<<<<< HEAD

                          <div className="flex items-center space-x-2">
=======
Alares Alexandre, [16/08/2025 15:09]
<div className="flex items-center space-x-2">
>>>>>>> f290f774967c8de4414563c1fc7c395cbf609ab2
                                {/* Ícone de Localização */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-lg font-medium text-gray-300">
                                    {address}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-300">
                            <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Foody Lanches. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}