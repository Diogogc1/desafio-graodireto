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

      if (!response.ok) {
        throw new Error(`Error creating pedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create pedido error:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${this.baseURL}/pedido`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching pedidos: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get all pedidos error:", error);
      throw error;
    }
  }

  async getById(pedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/pedido/${pedidoId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching pedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get pedido by ID error:", error);
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

      if (!response.ok) {
        throw new Error(`Error updating pedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update pedido error:", error);
      throw error;
    }
  }

  async delete(pedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/pedido/${pedidoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting pedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete pedido error:", error);
      throw error;
    }
  }
}

export default new PedidoService("http://localhost:3001");
