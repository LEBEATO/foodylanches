import {IconHeart} from '@tabler/icons-react';


const Footer = () => {
    return (
        <footer className="px-5 py-2 bg-slate-950 overflow-x-hidden ">
             <div className="flex justify-center flex-col items-center ">
               <p className="font-semibold text-zinc-400 text-center text-[14px]">
                Lanches Zuza &copy; {new Date().getFullYear() }todos os direitos reservados.
               </p>
               <div className="flex items-center">
                <p className="flex gap-2 font-semibold text-center text-zinc-400">
                    Desenvolvido com <IconHeart color="red"/> por Dev Alex
                </p>
                
               </div>
             </div>
        </footer>
    )
}
export default Footer;