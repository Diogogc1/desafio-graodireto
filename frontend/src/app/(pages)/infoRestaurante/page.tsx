"use client";

import CardItemCardapio from "@/components/CardItemCardapio";
import CardRestaurante from "@/components/CardRestaurante";
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
            <h1 className="sm:text-2xl text-xl mt-4">Informações do Restaurante</h1>
            {restaurante && (
                <div className="border border-black mt-4 flex items-center lg:w-[60%] sm:w-[50%] w-[80%] rounded-lg">
                  <img src={restaurante.fotoUrl} className="rounded-l-lg lg:w-[120] sm:w-[90] w-[70] " alt={`Foto do restaurante ${restaurante.nome}`} />
                    <div className="text-start sm:pl-4 pl-2 lg:text-base sm:text-xs text-[9px] flex flex-col lg:gap-0 gap-1">
                        <h2>{restaurante.nome}</h2>
                        <p>{restaurante.endereco}</p>
                        <p>{restaurante.telefone}</p>
                    </div>
              </div>
            )}

            <h2 className="text-xl mt-8">Cardapio</h2>
            {itensCardapio.map((item) => (
                <CardItemCardapio key={item.id} itemCardapio={item}></CardItemCardapio>
            ))}
        </>
    )
}