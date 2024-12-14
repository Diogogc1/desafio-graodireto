import CartContext, { CartItem } from "@/contexts/CartContext";
import { useContext } from "react";

export default function CardCartItem({ cartItem }: { cartItem: CartItem }) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="border border-black mt-4 flex items-center w-[60%] rounded-lg hover:bg-gray-50">
      <img src={cartItem.itemCardapioOutput.fotoUrl} className="rounded-l-lg" width={140} height={140} alt={`Foto do item ${cartItem.itemCardapioOutput.nome}`} />
      <div className="flex items-center justify-between w-full px-2">
            <div className="flex flex-col">
                <h2>{`Nome do Item: ${cartItem.itemCardapioOutput.nome}`}</h2>
                <p>{`Preço: ${cartItem.itemCardapioOutput.preco}`}</p>
                <p>{`Quantidade: ${cartItem.quantidade}`}</p>
            </div>
            <button className="bg-red-400 p-2 rounded-lg text-white" onClick={() => removeFromCart(cartItem.itemCardapioOutput.id)}>
                Remover
            </button>
      </div>
    </div>
  );
}