import PedidoInput from "../DTOs/inputs/PedidoInput";
const prisma = require("../../prisma/prismaClient.js");
import PedidoOutput from "../DTOs/outputs/PedidoOutput";

async function create(pedidoInput: PedidoInput): Promise<PedidoOutput> {
    return await prisma.pedidos.create({
        data: pedidoInput
    });
}

async function getAll(): Promise<PedidoOutput[]> {
    return await prisma.pedidos.findMany({
        where: { status: true },
    });
}

async function getById(id: number): Promise<PedidoOutput> {
    return await prisma.pedidos.findUnique({
        where: { id: id }
    });
}

async function update(id: number, pedidoInput: PedidoInput): Promise<PedidoOutput> {
    return await prisma.pedidos.update({
        where: { id: id },
        data: pedidoInput
    });
}

async function remove(id: number): Promise<void> {
    await prisma.pedidos.update({
        where: { id: id, status: true },
        data: { status: false }
    });
}

export default {
    create,
    getAll,
    getById,
    update,
    remove
};