export default class Restaurante {
    id: number;
    nome: string;
    telefone: string;
    endereco: string;
    fotoUrl: string;
    
    constructor() {
        this.id = 0;
        this.nome = "";
        this.telefone = "";
        this.endereco = "";
        this.fotoUrl = "";
    }
}