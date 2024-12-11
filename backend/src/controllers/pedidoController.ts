import { prisma } from "../../prisma/prismaClient.js";
import { Request, Response } from 'express';
import PedidoInput from "../DTOs/inputs/PedidoInput.js";
import PedidoOutput from "../DTOs/outputs/PedidoOutput.js";

async function create(req: Request<{}, {}, PedidoInput>, res: Response) {
    const { idUser, idRestaurante, data } = req.body;

    try {
      const dataPedido = {
        idUser,
        idRestaurante,
        data
      };
  
      const pedido: PedidoOutput = await prisma.pedidos.create({
        data: dataPedido
      });
  
      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar pedido', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const pedidos: PedidoOutput[] = await prisma.pedidos.findMany({
            where: { status: true }
        });
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pedidos', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const pedido: PedidoOutput = await prisma.pedidos.findUnique({
            where: { id: Number(id), status: true }
        });

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
    const { idUser, idRestaurante, data } = req.body;

    try {
        const pedido: PedidoOutput = await prisma.pedidos.update({
            where: { id: Number(id), status: true },
            data: { idUser, idRestaurante, data }
        });

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar pedido', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await prisma.pedidos.update({
            where: { id: Number(id), status: true },
            data: { status: false }
        });

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