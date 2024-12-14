import RestaurantInput from "../DTOs/inputs/RestauranteInput";

class RestaurantService {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async create(restaurantInput: RestaurantInput) {
    try {
      const response = await fetch(`${this.baseURL}/restaurante`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantInput),
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao criar restaurante:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${this.baseURL}/restaurante`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar todos os restaurantes:", error);
      throw error;
    }
  }

  async getById(restaurantId: string) {
    try {
      const response = await fetch(`${this.baseURL}/restaurante/${restaurantId}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar restaurante por ID:", error);
      throw error;
    }
  }

  async update(restaurantId: string, restaurantInput: RestaurantInput) {
    try {
      const response = await fetch(`${this.baseURL}/restaurante/${restaurantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantInput),
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar restaurante:", error);
      throw error;
    }
  }

  async delete(restaurantId: string) {
    try {
      const response = await fetch(`${this.baseURL}/restaurante/${restaurantId}`, {
        method: "DELETE",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao deletar restaurante:", error);
      throw error;
    }
  }

  async search(termo: string) {
    try {
      console.log('Termo de busca:', termo);
      const response = await fetch(`${this.baseURL}/restaurante/search/${termo}`, {
        method: "GET",
      });

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar restaurante:", error);
      throw error;
    }
  }
}

const restauranteService = new RestaurantService("http://localhost:3001");
export default restauranteService;