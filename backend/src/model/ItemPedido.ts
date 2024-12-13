import ItemCardapio from "./ItemCardapio";
import Pedido from "./Pedido";

export default class ItemPedido{
    id: number;
    id_pedido: number;
    idItemCardapio: number;
    quantidade: number;

    constructor(){
        this.id = 0;
        this.id_pedido = 0;
        this.idItemCardapio = 0;
        this.quantidade = 0
    }
}