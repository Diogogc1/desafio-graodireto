import { prisma } from "../../prisma/prismaClient";
import { Request, Response } from 'express';
import RestauranteInput from "../DTOs/inputs/RestauranteInput";
import RestauranteOutput from "../DTOs/outputs/RestauranteOutput";
import restauranteService from "../services/restauranteService";

async function create(req: Request<{}, {}, RestauranteInput>, res: Response) {
    const restauranteInput: RestauranteInput = req.body;

    try {  
      const restaurante: RestauranteOutput = await restauranteService.create(restauranteInput);
  
      res.status(201).json(restaurante);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar restaurante', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const restaurantes: RestauranteOutput[] = await restauranteService.getAll();
        res.status(200).json(restaurantes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar restaurantes', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const restaurante: RestauranteOutput = await restauranteService.getById(Number(id));

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
    const restauranteInput: RestauranteInput = req.body;

    try {
        const restaurante: RestauranteOutput = await restauranteService.update(Number(id), restauranteInput);
        res.status(200).json(restaurante);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar restaurante', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await restauranteService.remove(Number(id));

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
