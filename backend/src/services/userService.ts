import userInput from "../DTOs/inputs/UserInput";
const prisma = require("../../prisma/prismaClient.js");
import userOutput from "../DTOs/outputs/UserOutput";

async function create(userInput: userInput): Promise<userOutput> {
    return await prisma.users.create({
        data: userInput
    });
}

async function getAll(): Promise<userOutput[]> {
    return await prisma.users.findMany({
        where: { status: true }
    });
}

async function getById(id: number): Promise<userOutput> {
    return await prisma.users.findUnique({
        where: { id: id, status: true }
    });
}

async function update(id: number, userInput: userInput): Promise<userOutput> {
    return await prisma.users.update({
        where: { id: id, status: true },
        data: userInput
    });
}

async function remove(id: number): Promise<void> {
    await prisma.users.update({
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