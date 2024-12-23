import restauranteInput from "../DTOs/inputs/RestauranteInput";
import RestauranteOutput from "../DTOs/outputs/RestauranteOutput";
import NotFoundError from "../errors/NotFoundError";
import Restaurante from "../model/Restaurante";
const prisma = require("../../prisma/prismaClient.js");

async function create(restauranteInput: restauranteInput): Promise<RestauranteOutput> {
    const restaurante: Restaurante = await prisma.restaurantes.create({
        data: restauranteInput
    });

    const restauranteOutput: RestauranteOutput = {
        id: restaurante.id,
        nome: restaurante.nome,
        telefone: restaurante.telefone,
        endereco: restaurante.endereco,
        fotoUrl: restaurante.fotoUrl
    };

    return restauranteOutput;
}

async function getAll(): Promise<RestauranteOutput[]> {
    const restaurantes: Restaurante[] = await prisma.restaurantes.findMany({
        where: { status: true },
    });

    if(restaurantes.length === 0) {
        throw new NotFoundError()
    }

    const restaurantesOutput: RestauranteOutput[] = restaurantes.map(restaurante => {
        return {
            id: restaurante.id,
            nome: restaurante.nome,
            telefone: restaurante.telefone,
            endereco: restaurante.endereco,
            fotoUrl: restaurante.fotoUrl
        };
    });

    return restaurantesOutput;
}

async function getById(id: number): Promise<RestauranteOutput> {
    const restaurante: Restaurante = await prisma.restaurantes.findUnique({
        where: { id: id },
    });

    if(!restaurante) {
        throw new NotFoundError()
    }

    const restauranteOutput: RestauranteOutput = {
        id: restaurante.id,
        nome: restaurante.nome,
        telefone: restaurante.telefone,
        endereco: restaurante.endereco,
        fotoUrl: restaurante.fotoUrl
    };

    return restauranteOutput;
}

async function update(id: number, restauranteInput: restauranteInput): Promise<RestauranteOutput> {
    const restaurante: Restaurante = await prisma.restaurantes.update({
        where: { id: id, status: true },
        data: restauranteInput
    });

    const restauranteOutput: RestauranteOutput = {
        id: restaurante.id,
        nome: restaurante.nome,
        telefone: restaurante.telefone,
        endereco: restaurante.endereco,
        fotoUrl: restaurante.fotoUrl
    };

    return restauranteOutput;
}

async function remove(id: number): Promise<void> {
    await prisma.restaurantes.update({
        where: { id: id, status: true },
        data: { status: false }
    });
}

async function search(termo: string, page: number = 1, pageSize: number = 10) {
    const restaurantes = await prisma.restaurantes.findMany({
        where: {
            OR: [
                {
                    nome: {
                        contains: termo,
                        mode: 'insensitive',
                    },
                },
                {
                    itens_cardapio: {
                        some: {
                            OR: [
                                {
                                    nome: {
                                        contains: termo,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    descricao: {
                                        contains: termo,
                                        mode: 'insensitive',
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        },
        include: {
            itens_cardapio: true, // Inclui os itens do cardápio relacionados
        },
        skip: (page - 1) * pageSize, // Pula os registros das páginas anteriores
        take: pageSize, // Limita o número de registros por página
    });

    return restaurantes;
}

export default {
    create,
    getAll,
    getById,
    update,
    remove,
    search
};