import { prisma } from "../../prisma/prismaClient.js";
import { Request, Response } from 'express';
import UserInput from "../DTOs/inputs/UserInput.js";
import UserOutput from "../DTOs/outputs/UserOutput.js";

async function create(req: Request<{}, {}, UserInput>, res: Response) {
    const { nome, email, uidFirebase } = req.body;

    try {
      const data = {
        nome,
        email,
        uidFirebase
      };
  
      const user: UserOutput = await prisma.users.create({
        data
      });
  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', descricao: error });
    }
};


async function getAll(req: Request, res: Response) {
    try {
        const users: UserOutput[] = await prisma.users.findMany({
            where: { status: true }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', descricao: error });
    }
}

async function getById(req: Request, res: Response){
    const { id } = req.params;

    try {
        const user: UserOutput = await prisma.users.findUnique({
            where: { id: Number(id), status: true }
        });

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário', descricao: error });
    }
}

async function update(req: Request<{ id: string }, {}, UserInput>, res: Response) {
    const { id } = req.params;
    const { nome, email, uidFirebase } = req.body;

    try {
        const user: UserOutput = await prisma.users.update({
            where: { id: Number(id), status: true },
            data: { nome, email, uidFirebase }
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário', descricao: error });
    }
}

async function remove(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        await prisma.users.update({
            where: { id: Number(id), status: true },
            data: { status: false }
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário', descricao: error });
    }
}

export default { 
    create, 
    getAll, 
    getById, 
    update, 
    remove 
};