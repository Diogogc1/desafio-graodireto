"use client"
import ItemCardapioOutput from "@/DTOs/outputs/ItemCardapioOutput";
import React, { createContext, useState, ReactNode } from "react";

interface CartItem {
  itemCardapioOutput: ItemCardapioOutput;
  quantidade: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (itemCardapio: ItemCardapioOutput) => void;
  removeFromCart: (idItemPedido: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemCardapio: ItemCardapioOutput) => {
    setCartItems((prevItems) => {
      // Verifica se já existe um item de outro restaurante no carrinho
      if(cartItems.length > 0){
        const restauranteDiferente = prevItems.find(
          (cartItem) => cartItem.itemCardapioOutput.restauranteOutput.id !== itemCardapio.restauranteOutput.id
        );
    
        if (restauranteDiferente) {
          // Impede a adição de itens de outro restaurante se já existir um item de restaurante diferente no carrinho
          alert("Você só pode adicionar itens de um restaurante por vez.");
          return prevItems;
        }
      }
  
      const itemExistente = prevItems.find(
        (cartItem) => cartItem.itemCardapioOutput.id === itemCardapio.id
      );
  
      if (itemExistente) {
        // Atualiza a quantidade do item existente
        return prevItems.map((cartItem) =>
          cartItem.itemCardapioOutput.id === itemCardapio.id
            ? { ...cartItem, quantidade: cartItem.quantidade + 1 }
            : cartItem
        );
      } else {
        // Adiciona um novo item ao carrinho
        const novoItem: CartItem = { itemCardapioOutput: itemCardapio, quantidade: 1 };
        return [...prevItems, novoItem];
      }
    });
  };
  
  

  const removeFromCart = (idItemPedido: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((cartItem) => {
          if (cartItem.itemCardapioOutput.id === idItemPedido) {
            if (cartItem.quantidade > 1) {
            return { ...cartItem, quantidade: cartItem.quantidade - 1 };
          } else {
            return null;
          }
        }
        return cartItem; 
      }).filter((item) => item !== null);
    });
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;