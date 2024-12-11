import restauranteInput from "../DTOs/inputs/RestauranteInput";
const prisma = require("../../prisma/prismaClient.js");
import restauranteOutput from "../DTOs/outputs/RestauranteOutput";

async function create(restauranteInput: restauranteInput): Promise<restauranteOutput> {
    return await prisma.restaurantes.create({
        data: restauranteInput
    });
}

async function getAll(): Promise<restauranteOutput[]> {
    return await prisma.restaurantes.findMany({
        where: { status: true },
    });
}

async function getById(id: number): Promise<restauranteOutput> {
    return await prisma.restaurantes.findUnique({
        where: { id: id },
    });
}

async function update(id: number, restauranteInput: restauranteInput): Promise<restauranteOutput> {
    return await prisma.restaurantes.update({
        where: { id: id, status: true },
        data: restauranteInput
    });
}

async function remove(id: number): Promise<void> {
    await prisma.restaurantes.update({
        where: { id: id, status: true },
        data: { status: false }
    });
}

export default {
    create,
    getAll,
    getById,
    update,
    remove
};