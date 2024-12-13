"use client";

import { AuthContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function Restaurantes() {
  const { carregando } = useContext(AuthContext);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return <h1>Restaurante</h1>;
}
