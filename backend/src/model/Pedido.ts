import Restaurante from "./Restaurante";
import User from "./User";

export default class Pedido {
    id: number;
    idUser: number;
    idRestaurante: number;
    data: Date;

    constructor() {
        this.id = 0;
        this.idUser = 0;
        this.idRestaurante = 0;
        this.data = new Date();
    }
}