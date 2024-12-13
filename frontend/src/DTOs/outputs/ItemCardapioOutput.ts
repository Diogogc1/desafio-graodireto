import RestauranteOutput from "./RestauranteOutput";

export default interface ItemCardapioOutput{
    id: number;
    restauranteOutput: RestauranteOutput;
    nome: string;
    descricao: string;
    preco: number;
    fotoUrl: string;
}