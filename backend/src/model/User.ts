export default class User {
    id: number;
    nome: string;
    uidFirebase: string;

    constructor() {
        this.id = 0;
        this.nome = "";   
        this.uidFirebase = "";
    }
}