"use client";

import CardRestaurante from "@/components/CardRestaurante";
import { AuthContext } from "@/contexts/AuthContext";
import RestauranteOutput from "@/DTOs/outputs/RestauranteOutput";

import restauranteService from "@/services/RestauranteService";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

export default function Restaurantes() {
  const { carregando } = useContext(AuthContext);
  const [restaurantes, setRestaurantes] = useState<RestauranteOutput[]>([]);
  const router = useRouter();
  const [termoBusca, setTermoBusca] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Cria uma ref para armazenar o valor mais atual do termo de busca
  const termoBuscaRef = useRef(termoBusca);

  // Atualiza o valor da ref sempre que termoBusca mudar
  useEffect(() => {
    termoBuscaRef.current = termoBusca;
  }, [termoBusca]);

  const fetchItensCardapio = useCallback(async () => {
    try {
      const response: RestauranteOutput[] = await restauranteService.getAll();
      setRestaurantes(response);
    } catch (error) {
      alert("Erro ao buscar itens do cardápio!");
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchItensCardapio();
  }, [fetchItensCardapio]);

  const handleSearch = useCallback(async () => {
    try {
      // Acessa o valor mais atual de termoBusca através da ref
      const termo = termoBuscaRef.current;
      console.log("Buscando restaurantes...");
      console.log("Termo de busca:", termo);
      const response: RestauranteOutput[] = await restauranteService.search(termo);
      setRestaurantes(response);
    } catch (error) {
      alert("Erro ao buscar itens do cardápio!");
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log("Termo de busca mudou:", termoBusca);

    // Limpa o timer anterior sempre que o termo de busca mudar
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Configura um novo timer para chamar handleSearch após 1000ms
    const timer = setTimeout(() => {
      if (termoBusca !== "") {
        handleSearch();
      }else{
        // Se o termo de busca estiver vazio, busca todos os restaurantes
        fetchItensCardapio();
      }
    }, 1000);

    setDebounceTimer(timer);

    // Limpa o timer quando o componente for desmontado
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [termoBusca, handleSearch]);

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h1 className="text-2xl mt-4">Restaurantes</h1>
      <input
        type="text"
        placeholder="Digite para buscar..."
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        className="border p-2 sm:w-[60%] w-[80%] rounded-lg mt-4 mb-8 h-12"
      />
      {restaurantes.map((restaurante) => (
        <CardRestaurante key={restaurante.id} restaurante={restaurante}></CardRestaurante>
      ))}
    </>
  );
}
