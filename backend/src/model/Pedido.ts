import Restaurante from "./Restaurante";
import User from "./User";

export default class Pedido {
    id: number;
    user: User;
    restaurante: Restaurante;
    data: Date;

    constructor() {
        this.id = 0;
        this.user = new User();
        this.restaurante = new Restaurante();
        this.data = new Date();
    }
}