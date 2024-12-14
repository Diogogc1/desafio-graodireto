import ItemCardapioOutput from "@/DTOs/outputs/ItemCardapioOutput";
import { useRouter } from "next/navigation";

export default function CardItemCardapio({ itemCardapio }: { itemCardapio: ItemCardapioOutput }) {
    const router = useRouter();
    
    return (
        <button
            onClick={() => router.push(`/infoItemCardapio?id=${itemCardapio.id}`)}
            className="border border-black mt-4 flex items-center sm:w-[55%] w-[80%] rounded-lg hover:bg-gray-50"
        >
            <img src={itemCardapio.fotoUrl} className="rounded-l-lg sm:w-[140px] w-[90px]" alt={`Foto do item ${itemCardapio.nome}`} />
            <div className="text-start sm:pl-4 pl-2 sm:text-base text-[9px]">
                <h2 className="font-semibold">{itemCardapio.nome}</h2>
                <p>{`Descrição: ${itemCardapio.descricao}`}</p>
                <p>{`Preço: ${itemCardapio.preco}`}</p>
            </div>
        </button>
    )
}