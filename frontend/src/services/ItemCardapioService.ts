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

      if (!response.ok) {
        throw new Error(`Error creating itemCardapio: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create itemCardapio error:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching itemCardapios: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get all itemCardapios error:", error);
      throw error;
    }
  }

  async getById(itemCardapioId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio/${itemCardapioId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching itemCardapio: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get itemCardapio by ID error:", error);
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
        throw new Error(`Error updating itemCardapio: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update itemCardapio error:", error);
      throw error;
    }
  }

  async delete(itemCardapioId: string) {
    try {
      const response = await fetch(`${this.baseURL}/itemCardapio/${itemCardapioId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting itemCardapio: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete itemCardapio error:", error);
      throw error;
    }
  }
}

export default new ItemCardapioService("http://localhost:3001");