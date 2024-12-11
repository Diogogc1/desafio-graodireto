import { prisma } from "../../prisma/prismaClient.js";
import { Request, Response } from 'express';
import PedidoInput from "../DTOs/inputs/PedidoInput";
import PedidoOutput from "../DTOs/outputs/PedidoOutput";
import pedidoService from "../services/pedidoService";

async function create(req: Request<{}, {}, PedidoInput>, res: Response) {
    const pedidoInput: PedidoInput = req.body;

    try {  
      const pedido: PedidoOutput = await pedidoService.create(pedidoInput);
  
      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar pedido', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const pedidos: PedidoOutput[] = await pedidoService.getAll();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pedidos', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const pedido: PedidoOutput = await pedidoService.getById(Number(id));

        if (!pedido) {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pedido', descricao: error });
    }
}

async function update(req: Request<{ id: string }, {}, PedidoInput>, res: Response) {
    const { id } = req.params;
    const pedidoInput: PedidoInput = req.body;

    try {
        const pedido: PedidoOutput = await pedidoService.update(Number(id), pedidoInput);

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar pedido', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await pedidoService.remove(Number(id));

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar pedido', descricao: error });
    }
}

export default { 
    create, 
    getAll, 
    getById, 
    update, 
    remove 
};