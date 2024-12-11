const prisma = require("../../prisma/prismaClient.js");
import ItemCardapioInput from "../DTOs/inputs/ItemCardapioInput.js";
import ItemCardapioOutput from "../DTOs/outputs/ItemCardapioOutput.js";

async function create(itemCardapioInput: ItemCardapioInput) : Promise<ItemCardapioOutput> {
    return await prisma.itens_cardapio.create({
        data: itemCardapioInput
    });
}

async function getAll() : Promise<ItemCardapioOutput[]> {
    return await prisma.itens_cardapio.findMany({
        where: { status: true }
    });
}

async function getById(id: number) : Promise<ItemCardapioOutput> {
    return await prisma.itens_cardapio.findUnique({
        where: { id, status: true }
    });
}

async function update(id: number, itemCardapioInput: ItemCardapioInput) : Promise<ItemCardapioOutput> {
    return await prisma.itens_cardapio.update({
        where: { id },
        data: itemCardapioInput
    });
}

async function remove(id: number) : Promise<void> {
    await prisma.itens_cardapio.update({
        where: { id },
        data: { status: false }
    });
}

export default{ 
    create,
    getAll,
    getById,
    update,
    remove
};