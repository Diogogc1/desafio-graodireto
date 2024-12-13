import { prisma } from "../../prisma/prismaClient.js";
import { Request, Response } from 'express';
import ItemPedidoInput from "../DTOs/inputs/ItemPedidoInput";
import ItemPedidoOutput from "../DTOs/outputs/ItemPedidoOutput";
import itemPedidoService from "../services/itemPedidoService";
import NotFoundError from "../errors/NotFoundError";

async function create(req: Request<{}, {}, ItemPedidoInput>, res: Response) {
    const ItemPedidoInput: ItemPedidoInput = req.body;

    try {  
      const ItemPedidoOutput: ItemPedidoOutput = await itemPedidoService.create(ItemPedidoInput);
  
      res.status(201).json(ItemPedidoOutput);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar item de pedido', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const itensPedido: ItemPedidoOutput[] = await itemPedidoService.getAll();

        res.status(200).json(itensPedido);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({ error: 'Itens pedido não encontrados', descricao: error });
        }else{
            res.status(500).json({ error: 'Erro ao buscar itens de pedido', descricao: error });
        }
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const itemPedido: ItemPedidoOutput = await itemPedidoService.getById(Number(id));

        res.status(200).json(itemPedido);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({ error: 'Item Pedido não encontrado', descricao: error });
        }else{
            res.status(500).json({ error: 'Erro ao buscar item de pedido', descricao: error });
        }
    }
}

async function update(req: Request<{ id: string }, {}, ItemPedidoInput>, res: Response) {
    const { id } = req.params;
    const itemPedidoInput: ItemPedidoInput = req.body;

    try {
        const itemPedido: ItemPedidoOutput = await itemPedidoService.update(Number(id), itemPedidoInput);

        res.status(200).json(itemPedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar item de pedido', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await itemPedidoService.remove(Number(id));

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
