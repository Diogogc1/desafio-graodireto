import { Request, Response } from 'express';
import ItemCardapioInput from "../DTOs/inputs/ItemCardapioInput";
import ItemCardapioOutput from "../DTOs/outputs/ItemCardapioOutput";
import itemCardapioService from "../services/itemCardapioService";
import NotFoundError from '../errors/NotFoundError';

async function create(req: Request<{}, {}, ItemCardapioInput>, res: Response) {
    const itemCardapioInput: ItemCardapioInput = req.body;

    try {
      const itemCardapioOutput: ItemCardapioOutput = await itemCardapioService.create(itemCardapioInput);
      console.log("cccccc");
      console.log(itemCardapioOutput);
  
      res.status(201).json(itemCardapioOutput);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar item do cardápio', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const itensCardapioOutput: ItemCardapioOutput[] = await itemCardapioService.getAll();
        res.status(200).json(itensCardapioOutput);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({ error: 'Itens Cardapio não encontrados', descricao: error });
        }else{
            res.status(500).json({ error: 'Erro ao buscar itens do cardápio', descricao: error });
        }
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const itemCardapioOutput: ItemCardapioOutput = await itemCardapioService.getById(Number(id));

        res.status(200).json(itemCardapioOutput);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({ error: 'Item cardápio não encontrado', descricao: error });
        }else{
            res.status(500).json({ error: 'Erro ao buscar item do cardápio', descricao: error });
        }
    }
}

async function update(req: Request<{ id: string }, {}, ItemCardapioInput>, res: Response) {
    const { id } = req.params;
    const itemCardapioInput: ItemCardapioInput = req.body;

    try {
        const itemCardapioOutput: ItemCardapioOutput = await itemCardapioService.update(Number(id), itemCardapioInput);

        res.status(200).json(itemCardapioOutput);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar item do cardápio', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await itemCardapioService.remove(Number(id));

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