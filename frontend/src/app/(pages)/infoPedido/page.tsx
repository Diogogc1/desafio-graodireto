"use client"

import { CardItemPedido } from "@/components/CardItemPedido";
import itemPedidoOutput from "@/DTOs/outputs/ItemPedidoOutput";
import PedidoOutput from "@/DTOs/outputs/PedidoOutput";
import itemPedidoService from "@/services/ItemPedidoService";
import pedidoService from "@/services/PedidoService";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function InfoPedido() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [pedido, setPedido] = useState<PedidoOutput>()
    const [itensPedido, setItensPedido] = useState<itemPedidoOutput[]>([])
    const router = useRouter();

    const fetchPedido = useCallback(async () => {
        try {
            const response: PedidoOutput = await pedidoService.getById(id!)
            setPedido(response)
        } catch (error) {
            console.error(error)
        }
    }, [id])

    const fetchItensPedido = useCallback(async () => {
        try{
            const response: itemPedidoOutput[] = await itemPedidoService.getAllForPedido(id!);
            setItensPedido(response);
        }catch(error){
            alert(`Erro ao buscar itens do cardápio!`);
            console.error(error);
        };
    }, [id])

    useEffect(() => {
        if(id != null){
            fetchPedido()
            fetchItensPedido()
        }
    }, [id, fetchPedido, fetchItensPedido])

    return(
        <>
            <h1 className="text-2xl mt-4">Informações do Pedido</h1>
            {pedido && (
                <div className="border p-4 py-10 gap-1 border-black mt-4 flex flex-col text-start justify-center h-16 sm:w-[60%] w-[70%] rounded-lg">
                    <h2 className="font-semibold">{`Restaurante: ${pedido.restauranteOutput.nome}`}</h2>
                    <p>{`Data: ${moment(pedido.data).format('DD/MM/YYYY')}`}</p>
                </div>
            )}

            <h2 className="text-xl mt-8">Itens do Pedido</h2>
            {itensPedido.map((item) => (
               <CardItemPedido itemPedido={item} key={item.id} /> 
            ))}
        </>
    )

}