import { Request, Response } from 'express';
import ItemCardapioInput from "../DTOs/inputs/ItemCardapioInput";
import ItemCardapioOutput from "../DTOs/outputs/ItemCardapioOutput";
import itemCardapioService from "../services/itemCardapioService";

async function create(req: Request<{}, {}, ItemCardapioInput>, res: Response) {
    const { idRestaurante, nome, descricao, preco } = req.body;

    try {
      const dataItemCardapio: ItemCardapioInput = {
        idRestaurante,
        nome,
        descricao,
        preco
      };
  
      const itemCardapio: ItemCardapioOutput = await itemCardapioService.create(dataItemCardapio);
  
      res.status(201).json(itemCardapio);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar item do cardápio', descricao: error });
    }
};

async function getAll(req: Request, res: Response) {
    try {
        const itensCardapio: ItemCardapioOutput[] = await itemCardapioService.getAll();
        res.status(200).json(itensCardapio);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens do cardápio', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const itemCardapio: ItemCardapioOutput = await itemCardapioService.getById(Number(id));

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
    const itemCardapioInput: ItemCardapioInput = req.body;

    try {
        const itemCardapio: ItemCardapioOutput = await itemCardapioService.update(Number(id), itemCardapioInput);

        res.status(200).json(itemCardapio);
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