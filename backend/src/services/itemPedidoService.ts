const prisma = require("../../prisma/prismaClient.js");
import itemPedidoInput from "../DTOs/inputs/ItemPedidoInput";
import itemPedidoOutput from "../DTOs/outputs/ItemPedidoOutput";

async function create(itemPedidoInput: itemPedidoInput): Promise<itemPedidoOutput> {
    return await prisma.itens_pedido.create({
        data: itemPedidoInput
    });
}

async function getAll(): Promise<itemPedidoOutput[]>{
    return await prisma.itens_pedido.findMany({
        where: { status: true }
    });
}

async function getById(id: number): Promise<itemPedidoOutput>{
    return await prisma.itens_pedido.findUnique({
        where: { id: id, status: true }
    });
}

async function update(id: number, itemPedidoInput: itemPedidoInput): Promise<itemPedidoOutput>{
    return await prisma.itens_pedido.update({
        where: { id: id, status: true },
        data: itemPedidoInput
    });
}

async function remove(id: number): Promise<void>{
    await prisma.itens_pedido.update({
        where: { id: id },
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