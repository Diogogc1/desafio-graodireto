import userInput from "../DTOs/inputs/UserInput";
import UserOutput from "../DTOs/outputs/UserOutput";
import NotFoundError from "../errors/NotFoundError";
import User from "../model/User";
const prisma = require("../../prisma/prismaClient.js");

async function create(userInput: userInput): Promise<UserOutput> {
    const user: User = await prisma.users.create({
        data: userInput
    });

    const userOutput: UserOutput = {
        id: user.id,
        nome: user.nome,
        uidFirebase: user.uidFirebase
    }

    return userOutput;
}

async function getAll(): Promise<UserOutput[]> {
    const user: User[] = await prisma.users.findMany({
        where: { status: true }
    });

    if (user.length === 0) {
        throw new NotFoundError();
    }

    const userOutput: UserOutput[] = user.map(user => {
        return {
            id: user.id,
            nome: user.nome,
            uidFirebase: user.uidFirebase
        }
    });

    return userOutput;
}

async function getById(id: number): Promise<UserOutput> {
    const user:User = await prisma.users.findUnique({
        where: { id: id, status: true }
    });

    if (!user) {
        throw new NotFoundError();
    }

    const userOutput: UserOutput = {
        id: user.id,
        nome: user.nome,
        uidFirebase: user.uidFirebase
    }

    return userOutput;
}

async function update(id: number, userInput: userInput): Promise<UserOutput> {
    const user: User = await prisma.users.update({
        where: { id: id, status: true },
        data: userInput
    });

    const userOutput: UserOutput = {
        id: user.id,
        nome: user.nome,
        uidFirebase: user.uidFirebase
    }

    return userOutput;
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