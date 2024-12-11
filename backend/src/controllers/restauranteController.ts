import { prisma } from "../../prisma/prismaClient.js";
import { Request, Response } from 'express';
import RestauranteInput from "../DTOs/inputs/RestauranteInput.js";
import RestauranteOutput from "../DTOs/outputs/RestauranteOutput.js";

async function create(req: Request<{}, {}, RestauranteInput>, res: Response) {
    const { nome, telefone, endereco } = req.body;

    try {
      const data = {
        nome,
        telefone,
        endereco
      };
  
      const restaurante: RestauranteOutput = await prisma.restaurantes.create({
        data
      });
  
      res.status(201).json(restaurante);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar restaurante', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const restaurantes: RestauranteOutput[] = await prisma.restaurantes.findMany({
            where: { status: true }
        });
        res.status(200).json(restaurantes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar restaurantes', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const restaurante: RestauranteOutput = await prisma.restaurantes.findUnique({
            where: { id: Number(id), status: true }
        });

        if (!restaurante) {
            res.status(404).json({ error: 'Restaurante não encontrado' });
        }

        res.status(200).json(restaurante);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar restaurante', descricao: error });
    }
}

async function update(req: Request<{ id: string }, {}, RestauranteInput>, res: Response) {
    const { id } = req.params;
    const { nome, telefone, endereco } = req.body;

    try {
        const restaurante: RestauranteOutput = await prisma.restaurantes.update({
            where: { id: Number(id), status: true },
            data: { nome, telefone, endereco }
        });

        res.status(200).json(restaurante);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar restaurante', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await prisma.restaurantes.update({
            where: { id: Number(id), status: true },
            data: { status: false }
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar restaurante', descricao: error });
    }
}

export default { 
    create, 
    getAll, 
    getById, 
    update, 
    remove 
};
