import PedidoInput from "../DTOs/inputs/PedidoInput";
import PedidoOutput from "../DTOs/outputs/PedidoOutput";
import NotFoundError from "../errors/NotFoundError";
import Pedido from "../model/Pedido";
import restauranteService from "./restauranteService";
import userService from "./userService";
const prisma = require("../../prisma/prismaClient.js");

async function create(pedidoInput: PedidoInput): Promise<PedidoOutput> {
    const pedido: Pedido = await prisma.pedidos.create({
        data: pedidoInput
    });

    const pedidoOutput: PedidoOutput = {
        id: pedido.id,
        userOutput: await userService.getById(pedido.idUser),
        restauranteOutput: await restauranteService.getById(pedido.idRestaurante),
        data: pedido.data
    };

    return pedidoOutput;
}

async function getAllForUsers(idUser: number): Promise<PedidoOutput[]> {
    const pedido: Pedido[] = await prisma.pedidos.findMany({
        where: { status: true, idUser: idUser },
    });

    if (pedido.length === 0) {
        throw new NotFoundError()
    }

    const pedidosOutput: PedidoOutput[] = await Promise.all(pedido.map(async (pedido) => {
        return {
            id: pedido.id,
            userOutput: await userService.getById(pedido.idUser),
            restauranteOutput: await restauranteService.getById(pedido.idRestaurante),
            data: pedido.data
        }
    }));

    return pedidosOutput;
}

async function getById(id: number): Promise<PedidoOutput> {
    const pedido: Pedido = await prisma.pedidos.findUnique({
        where: { id: id }
    });

    if (!pedido) {
        throw new NotFoundError()
    }

    const pedidoOutput: PedidoOutput = {
        id: pedido.id,
        userOutput: await userService.getById(pedido.idUser),
        restauranteOutput: await restauranteService.getById(pedido.idRestaurante),
        data: pedido.data
    };

    return pedidoOutput;
}

async function update(id: number, pedidoInput: PedidoInput): Promise<PedidoOutput> {
    const pedido: Pedido = await prisma.pedidos.update({
        where: { id: id },
        data: pedidoInput
    });

    const pedidoOutput: PedidoOutput = {
        id: pedido.id,
        userOutput: await userService.getById(pedido.idUser),
        restauranteOutput: await restauranteService.getById(pedido.idRestaurante),
        data: pedido.data
    };

    return pedidoOutput;
}

async function remove(id: number): Promise<void> {
    await prisma.pedidos.update({
        where: { id: id, status: true },
        data: { status: false }
    });
}

export default {
    create,
    getAllForUsers,
    getById,
    update,
    remove
};