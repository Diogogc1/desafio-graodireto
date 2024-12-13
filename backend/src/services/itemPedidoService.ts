const prisma = require("../../prisma/prismaClient.js");
import itemPedidoInput from "../DTOs/inputs/ItemPedidoInput";
import itemPedidoOutput from "../DTOs/outputs/ItemPedidoOutput";
import NotFoundError from "../errors/NotFoundError";
import ItemPedido from "../model/ItemPedido";
import itemCardapioService from "./itemCardapioService";
import pedidoService from "./pedidoService";

async function create(itemPedidoInput: itemPedidoInput): Promise<itemPedidoOutput> {

    const itemPedido: ItemPedido = await prisma.itens_pedido.create({
        data: itemPedidoInput
    });

    const itemPedidoOutput: itemPedidoOutput = {
        id: itemPedido.id,
        pedidoOutput: await pedidoService.getById(itemPedido.id_pedido),
        itemCardapioOutput: await itemCardapioService.getById(itemPedido.idItemCardapio),
        quantidade: itemPedido.quantidade
    };

    return itemPedidoOutput
}

async function getAll(): Promise<itemPedidoOutput[]>{
    const itensPedido: ItemPedido[] = await prisma.itens_pedido.findMany({
        where: { status: true }
    });

    if(itensPedido.length === 0){
        throw new NotFoundError()
    }

    const itensPedidoOutput: itemPedidoOutput[] = await Promise.all(itensPedido.map(async (itemPedido) => {
        return {
            id: itemPedido.id,
            pedidoOutput: await pedidoService.getById(itemPedido.id_pedido),
            itemCardapioOutput: await itemCardapioService.getById(itemPedido.idItemCardapio),
            quantidade: itemPedido.quantidade
        }
    }));

    return itensPedidoOutput;
}

async function getById(id: number): Promise<itemPedidoOutput>{
    const itemPedido = await prisma.itens_pedido.findUnique({
        where: { id: id, status: true }
    });

    if (!itemPedido) {
        throw new Error('Item de pedido não encontrado');
    }

    const itemPedidoOutput: itemPedidoOutput = {
        id: itemPedido.id,
        pedidoOutput: await pedidoService.getById(itemPedido.idPedido),
        itemCardapioOutput: await itemCardapioService.getById(itemPedido.idItemCardapio),
        quantidade: itemPedido.quantidade
    };

    return itemPedidoOutput;
}

async function update(id: number, itemPedidoInput: itemPedidoInput): Promise<itemPedidoOutput>{
    const itemPedido: ItemPedido = await prisma.itens_pedido.update({
        where: { id: id, status: true },
        data: itemPedidoInput
    });

    const itemPedidoOutput: itemPedidoOutput = {
        id: itemPedido.id,
        pedidoOutput: await pedidoService.getById(itemPedido.id_pedido),
        itemCardapioOutput: await itemCardapioService.getById(itemPedido.idItemCardapio),
        quantidade: itemPedido.quantidade
    };

    return itemPedidoOutput;
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