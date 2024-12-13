"use client";

import { AuthContext } from "@/contexts/UserContext";
import RestauranteOutput from "@/DTOs/outputs/RestauranteOutput";

import restauranteService from "@/services/RestauranteService";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Restaurantes() {
  const { carregando } = useContext(AuthContext);
  const [restaurantes, setRestaurantes] = useState<RestauranteOutput[]>([]);
  const router = useRouter();

  async function fetchItensCardapio() {
    try{
      const response: RestauranteOutput[] = await restauranteService.getAll();
      setRestaurantes(response);
    }catch(error){
      alert(`Erro ao buscar itens do cardápio!`);
      console.error(error);
    };
  }

  useEffect(() => {
    fetchItensCardapio();
  }, []);


  if (carregando) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <h1>Restaurante</h1>
      {restaurantes.map((restaurante) => (
        <button key={restaurante.id} className="border-2 border-black p-4 mt-4" onClick={() => router.push(`/infoRestaurante?id=${restaurante.id}`)}>
          <h2>{restaurante.nome}</h2>
          <p>{restaurante.endereco}</p>
          <p>{restaurante.telefone}</p>
        </button>
      ))}
    </>
  )
}
