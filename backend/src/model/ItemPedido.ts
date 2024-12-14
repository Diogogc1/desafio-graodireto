import ItemCardapio from "./ItemCardapio";
import Pedido from "./Pedido";

export default class ItemPedido{
    id: number;
    idPedido: number;
    idItemCardapio: number;
    quantidade: number;

    constructor(){
        this.id = 0;
        this.idPedido = 0;
        this.idItemCardapio = 0;
        this.quantidade = 0
    }
}