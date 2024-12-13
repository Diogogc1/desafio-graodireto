"use client";

import ItemCardapioOutput from "@/DTOs/outputs/ItemCardapioOutput";
import RestauranteOutput from "@/DTOs/outputs/RestauranteOutput"
import ItemCardapioService from "@/services/ItemCardapioService";
import restauranteService from "@/services/RestauranteService"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function InfoRestaurante() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [restaurante, setRestaurante] = useState<RestauranteOutput>()
    const [itensCardapio, setItensCardapio] = useState<ItemCardapioOutput[]>([])
    const router = useRouter();

    const fetchRestaurante = useCallback(async () => {
        try {
            const response: RestauranteOutput = await restauranteService.getById(id!)
            setRestaurante(response)
        } catch (error) {
            console.error(error)
        }
    }, [id])

    const fetchItensCardapio = useCallback(async () => {
        try{
            const response: ItemCardapioOutput[] = await ItemCardapioService.getAllForRestaurante(id!);
            setItensCardapio(response);
        }catch(error){
            alert(`Erro ao buscar itens do cardápio!`);
            console.error(error);
        };
    }, [id])

    useEffect(() => {
        if(id != null){
            fetchRestaurante()
            fetchItensCardapio()
        }
    }, [id, fetchRestaurante, fetchItensCardapio])

    return(
        <>
            <h1>Informações do Restaurante</h1>
            {restaurante && (
                <div>
                    <h2>{restaurante.nome}</h2>
                    <p>{restaurante.endereco}</p>
                    <p>{restaurante.telefone}</p>
                </div>
            )}

            <h2>Cardapio</h2>
            {itensCardapio.map((item) => (
                <button onClick={() => router.push(`/infoItemCardapio?id=${item.id}`)} key={item.id} className="border-2 border-black p-4 mt-4">
                    <h2>{item.nome}</h2>
                    <img src={item.fotoUrl} alt={item.nome} width={100} />
                    <p>{item.descricao}</p>
                    <p>{item.preco}</p>
                </button>
            ))}
        </>
    )
}