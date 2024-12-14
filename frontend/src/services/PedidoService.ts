import PedidoInput from "@/DTOs/inputs/PedidoInput";

class PedidoService {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async create(pedidoInput: PedidoInput) {
    try {
      const response = await fetch(`${this.baseURL}/pedido`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoInput),
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      throw error;
    }
  }

  async getAllForUser(idUser: string) {
    try {
      const response = await fetch(`${this.baseURL}/pedido/forUser/${idUser}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar todos os pedidos:", error);
      throw error;
    }
  }

  async getById(pedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/pedido/${pedidoId}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar pedido por ID:", error);
      throw error;
    }
  }

  async update(pedidoId: string, pedidoInput: PedidoInput) {
    try {
      const response = await fetch(`${this.baseURL}/pedido/${pedidoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoInput),
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      throw error;
    }
  }

  async delete(pedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/pedido/${pedidoId}`, {
        method: "DELETE",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
      throw error;
    }
  }
}

const pedidoService = new PedidoService("http://localhost:3001");
export default pedidoService;