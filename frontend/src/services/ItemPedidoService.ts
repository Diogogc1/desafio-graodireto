import ItemPedidoInput from "@/DTOs/inputs/ItemPedidoInput";

class ItemPedidoService {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async create(itemPedidoInput: ItemPedidoInput) {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemPedidoInput),
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar itemPedido:", error);
      throw error;
    }
  }

  async getAllForPedido(idPedido: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido/forPedido/${idPedido}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar todos os itemPedidos:", error);
      throw error;
    }
  }

  async getById(itemPedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido/${itemPedidoId}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar itemPedido por ID:", error);
      throw error;
    }
  }

  async update(itemPedidoId: string, itemPedidoInput: ItemPedidoInput) {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido/${itemPedidoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemPedidoInput),
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar itemPedido:", error);
      throw error;
    }
  }

  async delete(itemPedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido/${itemPedidoId}`, {
        method: "DELETE",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao deletar itemPedido:", error);
      throw error;
    }
  }
}

const itemPedidoService = new ItemPedidoService("http://localhost:3001");
export default itemPedidoService;
