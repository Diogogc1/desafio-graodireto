export default class User {
    id: number;
    nome: string;
    email: string;
    uidFirebase: string;

    constructor() {
        this.id = 0;
        this.nome = "";
        this.email = "";
        this.uidFirebase = "";
    }
}