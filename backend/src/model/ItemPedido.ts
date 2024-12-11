import ItemCardapio from "./ItemCardapio";
import Pedido from "./Pedido";

export default class ItemPedido{
    id: number;
    pedido: Pedido;
    itemCardapio: ItemCardapio;
    quantidade: number;

    constructor(){
        this.id = 0;
        this.pedido = new Pedido();
        this.itemCardapio = new ItemCardapio();
        this.quantidade = 0
    }
}