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

      if (!response.ok) {
        throw new Error(`Error creating itemPedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create itemPedido error:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching itemPedidos: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get all itemPedidos error:", error);
      throw error;
    }
  }

  async getById(itemPedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido/${itemPedidoId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching itemPedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get itemPedido by ID error:", error);
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

      if (!response.ok) {
        throw new Error(`Error updating itemPedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update itemPedido error:", error);
      throw error;
    }
  }

  async delete(itemPedidoId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemPedido/${itemPedidoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting itemPedido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete itemPedido error:", error);
      throw error;
    }
  }
}

const itemPedidoService = new ItemPedidoService("http://localhost:3001");
export default itemPedidoService