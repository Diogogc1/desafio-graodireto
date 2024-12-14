import UserInput from "@/DTOs/inputs/UserInput";

class UserService {
    baseURL: string;

    constructor(baseURL: string) {
      this.baseURL = baseURL;
    }
  
    async create(userInput: UserInput) {
      try {
        const response = await fetch(`${this.baseURL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
  
        return await response.json();
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
      }
    }
  
    async getAll() {
      try {
        const response = await fetch(`${this.baseURL}/user`, {
          method: "GET",
        });
  
        return await response.json();
      } catch (error) {
        console.error("Erro ao buscar todos os usuários:", error);
        throw error;
      }
    }
  
    async getById(userId: string) {
      try {
        const response = await fetch(`${this.baseURL}/user/${userId}`, {
          method: "GET",
        });

        console.log(`aaa ${response}`)
  
        return await response.json();
      } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        throw error;
      }
    }

    async getByUid(userId: string) {
      try {
        const response = await fetch(`${this.baseURL}/user/uid/${userId}`, {
          method: "GET",
        });

        console.log(`aaa ${response}`)
  
        return await response.json();
      } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        throw error;
      }
    }
  
    // Update a user by ID
    async update(userId: string, userInput: UserInput) {
      try {
        const response = await fetch(`${this.baseURL}/user/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        });
  
        return await response.json();
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
      }
    }
  
    // Delete a user by ID
    async delete(userId: string) {
      try {
        const response = await fetch(`${this.baseURL}/user/${userId}`, {
          method: "DELETE",
        });
  
        return await response.json();
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        throw error;
      }
    }
}  

const userService = new UserService("http://localhost:3001");
export default userService;