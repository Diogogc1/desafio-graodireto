import RestauranteOutput from "./RestauranteOutput";
import UserOutput from "./UserOutput";

export default interface PedidoOutput {
    id: number;
    userOutput: UserOutput;
    restauranteOutput: RestauranteOutput;
    data: Date;
}