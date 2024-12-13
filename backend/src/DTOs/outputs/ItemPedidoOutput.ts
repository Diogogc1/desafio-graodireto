import ItemCardapioOutput from "./ItemCardapioOutput";
import PedidoOutput from "./PedidoOutput";

export default interface itemPedidoOutput{
    id: number;
    pedidoOutput: PedidoOutput;
    itemCardapioOutput: ItemCardapioOutput;
    quantidade: number;
}