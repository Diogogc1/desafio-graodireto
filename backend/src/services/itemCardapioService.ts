const prisma = require("../../prisma/prismaClient");
import ItemCardapioInput from "../DTOs/inputs/ItemCardapioInput";
import ItemCardapioOutput from "../DTOs/outputs/ItemCardapioOutput";
import NotFoundError from "../errors/NotFoundError";
import ItemCardapio from "../model/ItemCardapio";
import restauranteService from "./restauranteService";

async function create(itemCardapioInput: ItemCardapioInput) : Promise<ItemCardapioOutput> {

    const itemCardapio: ItemCardapio = await prisma.itens_cardapio.create({
        data: itemCardapioInput
    });

    console.log(itemCardapio)

    const itemCardapioOutput: ItemCardapioOutput = {
        id: itemCardapio.id,
        restauranteOutput: await restauranteService.getById(itemCardapio.idRestaurante),
        nome: itemCardapio.nome,
        descricao: itemCardapio.descricao,
        preco: itemCardapio.preco,
        fotoUrl: itemCardapio.fotoUrl,
    };

    console.log("bbbbbb")

    return itemCardapioOutput;
}

async function getAllForRestaurante(idRestaurante: number) : Promise<ItemCardapioOutput[]> {
    const itensCardapio: ItemCardapio[] = await prisma.itens_cardapio.findMany({
        where: { status: true, idRestaurante: idRestaurante }
    });

    if(itensCardapio.length === 0){
        throw new NotFoundError()
    }

    const itensCardapioOutput: ItemCardapioOutput[] = await Promise.all(itensCardapio.map(async itemCardapio => {
        return {
            id: itemCardapio.id,
            restauranteOutput: await restauranteService.getById(itemCardapio.idRestaurante),
            nome: itemCardapio.nome,
            descricao: itemCardapio.descricao,
            preco: itemCardapio.preco,
            fotoUrl: itemCardapio.fotoUrl,
        };
    }));

    return itensCardapioOutput;
}

async function getById(id: number) : Promise<ItemCardapioOutput> {
    const itemCardapio: ItemCardapio = await prisma.itens_cardapio.findUnique({
        where: { id, status: true }
    });

    if(!itemCardapio){
        throw new NotFoundError()
    }

    const itemCardapioOutput: ItemCardapioOutput = {
        id: itemCardapio.id,
        restauranteOutput: await restauranteService.getById(itemCardapio.idRestaurante),
        nome: itemCardapio.nome,
        descricao: itemCardapio.descricao,
        preco: itemCardapio.preco,
        fotoUrl: itemCardapio.fotoUrl,
    };

    return itemCardapioOutput;
}

async function update(id: number, itemCardapioInput: ItemCardapioInput) : Promise<ItemCardapioOutput> {
    const itemCardapio: ItemCardapio = await prisma.itens_cardapio.update({
        where: { id },
        data: itemCardapioInput
    });

    const itemCardapioOutput: ItemCardapioOutput = {
        id: itemCardapio.id,
        restauranteOutput: await restauranteService.getById(itemCardapio.idRestaurante),
        nome: itemCardapio.nome,
        descricao: itemCardapio.descricao,
        preco: itemCardapio.preco,
        fotoUrl: itemCardapio.fotoUrl,
    };

    return itemCardapioOutput;
}

async function remove(id: number) : Promise<void> {
    await prisma.itens_cardapio.update({
        where: { id },
        data: { status: false }
    });
}

export default{ 
    create,
    getAllForRestaurante,
    getById,
    update,
    remove
};