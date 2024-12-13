import Restaurante from "./Restaurante";

export default class ItemCardapio {
    id: number;
    idRestaurante: number;
    nome: string;
    descricao: string;
    preco: number;
    fotoUrl: string;

    constructor(){
        this.id = 0;
        this.idRestaurante = 0;
        this.nome = "";
        this.descricao = "";
        this.preco = 0;
        this.fotoUrl = "";
    }
}