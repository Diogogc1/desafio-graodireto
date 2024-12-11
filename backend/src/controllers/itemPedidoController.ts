import { prisma } from "../../prisma/prismaClient.js";
import { Request, Response } from 'express';
import ItemPedidoInput from "../DTOs/inputs/ItemPedidoInput.js";
import ItemPedidoOutput from "../DTOs/outputs/ItemPedidoOutput.js";

async function create(req: Request<{}, {}, ItemPedidoInput>, res: Response) {
    const { idPedido, idItemCardapio, quantidade } = req.body;

    try {
      const dataItemPedido = {
        idPedido,
        idItemCardapio,
        quantidade
      };
  
      const itemPedido: ItemPedidoOutput = await prisma.itens_pedido.create({
        data: dataItemPedido
      });
  
      res.status(201).json(itemPedido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar item de pedido', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const itensPedido: ItemPedidoOutput[] = await prisma.itens_pedido.findMany({
            where: { status: true }
        });
        res.status(200).json(itensPedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens de pedido', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const itemPedido: ItemPedidoOutput = await prisma.itens_pedido.findUnique({
            where: { id: Number(id), status: true }
        });

        if (!itemPedido) {
            res.status(404).json({ error: 'Item de pedido não encontrado' });
        }

        res.status(200).json(itemPedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar item de pedido', descricao: error });
    }
}

async function update(req: Request<{ id: string }, {}, ItemPedidoInput>, res: Response) {
    const { id } = req.params;
    const { idPedido, idItemCardapio, quantidade } = req.body;

    try {
        const itemPedido: ItemPedidoOutput = await prisma.itens_pedido.update({
            where: { id: Number(id), status: true },
            data: { idPedido, idItemCardapio, quantidade }
        });

        res.status(200).json(itemPedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar item de pedido', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await prisma.itens_pedido.update({
            where: { id: Number(id), status: true },
            data: { status: false }
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar item de pedido', descricao: error });
    }
}

export default { 
    create, 
    getAll, 
    getById, 
    update, 
    remove 
};
