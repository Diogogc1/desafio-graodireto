import ItemPedidoOutput from "@/DTOs/outputs/ItemPedidoOutput";

export function CardItemPedido({ itemPedido }: { itemPedido: ItemPedidoOutput }) {
    return (
        <div className="border border-black mt-4 flex items-center sm:w-[55%] w-[80%] rounded-lg hover:bg-gray-50">
            <img src={itemPedido.itemCardapioOutput.fotoUrl} className="rounded-l-lg sm:w-[144px] w-[90px]" width={140} height={140} alt={`Foto do pedido do item ${itemPedido.itemCardapioOutput.nome}`} />
            <div className="text-start sm:pl-4 pl-2 sm:text-base text-[9px]">
                <h2 className="font-semibold">{itemPedido.itemCardapioOutput.nome}</h2>
                <p>{`Descrição: ${itemPedido.itemCardapioOutput.descricao}`}</p>
                <p>{`Preço: ${itemPedido.itemCardapioOutput.preco}`}</p>
                <p>{`Quantidade: ${itemPedido.quantidade}`}</p>
            </div>
        </div>
    )
}