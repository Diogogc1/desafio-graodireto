import { prisma } from "../../prisma/prismaClient.js";
import { Request, Response } from 'express';
import ItemCardapioInput from "../DTOs/inputs/ItemCardapioInput.js";
import ItemCardapioOutput from "../DTOs/outputs/ItemCardapioOutput.js";

async function create(req: Request<{}, {}, ItemCardapioInput>, res: Response) {
    const { idRestaurante, nome, descricao, preco } = req.body;

    try {
      const dataItemCardapio = {
        idRestaurante,
        nome,
        descricao,
        preco
      };
  
      const itemCardapio: ItemCardapioOutput = await prisma.itens_cardapio.create({
        data: dataItemCardapio
      });
  
      res.status(201).json(itemCardapio);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar item do cardápio', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const itensCardapio: ItemCardapioOutput[] = await prisma.itens_cardapio.findMany({
            where: { status: true }
        });
        res.status(200).json(itensCardapio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens do cardápio', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const itemCardapio: ItemCardapioOutput = await prisma.itens_cardapio.findUnique({
            where: { id: Number(id), status: true }
        });

        if (!itemCardapio) {
            res.status(404).json({ error: 'Item do cardápio não encontrado' });
        }

        res.status(200).json(itemCardapio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar item do cardápio', descricao: error });
    }
}

async function update(req: Request<{ id: string }, {}, ItemCardapioInput>, res: Response) {
    const { id } = req.params;
    const { idRestaurante, nome, descricao, preco } = req.body;

    try {
        const itemCardapio: ItemCardapioOutput = await prisma.itens_cardapio.update({
            where: { id: Number(id), status: true },
            data: { idRestaurante, nome, descricao, preco }
        });

        res.status(200).json(itemCardapio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar item do cardápio', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await prisma.itens_cardapio.update({
            where: { id: Number(id), status: true },
            data: { status: false }
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar item do cardápio', descricao: error });
    }
}

export default { 
    create, 
    getAll, 
    getById, 
    update, 
    remove 
};
