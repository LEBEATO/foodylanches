import {IconShoppingCartCopy} from '@tabler/icons-react';
import Link from 'next/link';

type ItemCountProps = {
    itemCount: number;
}

const CartButton = ({itemCount}:ItemCountProps) => {
    return (
      
       <Link href="/Cart">

         <div className='fixed z-40 top-0 p-3 mt-36 bg-transparent '> 
            <div className='flex justify-center p-4 '>
              <IconShoppingCartCopy color="#6e6666" size={40} stroke={2} />
               <div className="flex justify-center
                    bg-slate-500 border-2
                   text-zinc-100 
                    -ml-2 font-bold 
                   border-stone-400
                    items-center
                    w-[30px] h-[30px]
                    rounded-full">{itemCount}</div>
             </div> 
                 </div>
         </Link>

          
   
    )
}
export default CartButton;