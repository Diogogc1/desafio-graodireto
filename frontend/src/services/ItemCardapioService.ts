import ItemCardapioInput from "@/DTOs/inputs/ItemCardapioInput";

class ItemCardapioService {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async create(itemCardapioInput: ItemCardapioInput) {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemCardapioInput),
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar itemCardapio:", error);
      throw error;
    }
  }

  async getAllForRestaurante(idRestaurante: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio/forRestaurante/${idRestaurante}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar todos os itemCardapios:", error);
      throw error;
    }
  }

  async getById(itemCardapioId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio/${itemCardapioId}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar itemCardapio por ID:", error);
      throw error;
    }
  }

  async update(itemCardapioId: string, itemCardapioInput: ItemCardapioInput) {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio/${itemCardapioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemCardapioInput),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar itemCardapio: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar itemCardapio:", error);
      throw error;
    }
  }

  async delete(itemCardapioId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio/${itemCardapioId}`, {
        method: "DELETE",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao deletar itemCardapio:", error);
      throw error;
    }
  }
}

const itemCardapioService = new ItemCardapioService("http://localhost:3001");
export default itemCardapioService;