import Restaurante from "./Restaurante";

export default class ItemCardapio {
    id: number;
    restaurante: Restaurante;
    nome: string;
    descricao: string;
    preco: number;

    constructor(){
        this.id = 0;
        this.restaurante = new Restaurante();
        this.nome = "";
        this.descricao = "";
        this.preco = 0;
    }
}