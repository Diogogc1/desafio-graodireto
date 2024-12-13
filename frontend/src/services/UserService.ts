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
  
        if (!response.ok) {
          throw new Error(`Error creating user: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error("Create user error:", error);
        throw error;
      }
    }
  
    async getAll() {
      try {
        const response = await fetch(`${this.baseURL}/user`, {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error("Get all users error:", error);
        throw error;
      }
    }
  
    async getById(userId: string) {
      try {
        console.log(`bbbb ${userId}`)
        const response = await fetch(`${this.baseURL}/user/${userId}`, {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }

        console.log(`aaa ${response}`)
  
        return await response.json();
      } catch (error) {
        console.error("Get user by ID error:", error);
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
  
        if (!response.ok) {
          throw new Error(`Error updating user: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error("Update user error:", error);
        throw error;
      }
    }
  
    // Delete a user by ID
    async delete(userId: string) {
      try {
        const response = await fetch(`${this.baseURL}/user/${userId}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error(`Error deleting user: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        console.error("Delete user error:", error);
        throw error;
      }
    }
}  

export default new UserService("http://localhost:3001");