import RestaurantInput from "../DTOs/inputs/RestauranteInput";

class RestaurantService {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async create(restaurantInput: RestaurantInput) {
    try {
      const response = await fetch(`${this.baseURL}/restaurant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantInput),
      });

      if (!response.ok) {
        throw new Error(`Error creating restaurant: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create restaurant error:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${this.baseURL}/restaurant`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching restaurants: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get all restaurants error:", error);
      throw error;
    }
  }

  async getById(restaurantId: string) {
    try {
      const response = await fetch(`${this.baseURL}/restaurants/${restaurantId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching restaurant: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get restaurant by ID error:", error);
      throw error;
    }
  }

  async update(restaurantId: string, restaurantInput: RestaurantInput) {
    try {
      const response = await fetch(`${this.baseURL}/restaurants/${restaurantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantInput),
      });

      if (!response.ok) {
        throw new Error(`Error updating restaurant: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update restaurant error:", error);
      throw error;
    }
  }

  async delete(restaurantId: string) {
    try {
      const response = await fetch(`${this.baseURL}/restaurants/${restaurantId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting restaurant: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete restaurant error:", error);
      throw error;
    }
  }
}

export default new RestaurantService("http://localhost:3001");