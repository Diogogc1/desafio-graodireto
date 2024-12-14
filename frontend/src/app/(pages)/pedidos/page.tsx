"use client"

import CardPedido from "@/components/CardPedido"
import { AuthContext } from "@/contexts/AuthContext"
import PedidoOutput from "@/DTOs/outputs/PedidoOutput"
import pedidoService from "@/services/PedidoService"
import { useCallback, useContext, useEffect, useState } from "react"

export default function Pedidos(){
    const [pedidos, setPedidos] = useState<PedidoOutput[]>([])
    const {usuarioLogado, carregando} = useContext(AuthContext)

    const fetchPedidos = useCallback( async () => {
        try{
            const response = await pedidoService.getAllForUser(usuarioLogado.id.toString())
            setPedidos(response)
        }catch(e){
            console.error(e)
            alert("Erro ao buscar pedidos!")
        }
    }, [usuarioLogado])

    useEffect(() => {
        if(!carregando){
            fetchPedidos()
        }   
    }, [usuarioLogado, fetchPedidos, carregando])

    return (
        <>
            <h1 className="text-2xl mt-4">Pedidos</h1>
           
            {pedidos.map((pedido) => (
                <CardPedido pedido={pedido} key={pedido.id} />
            ))}
        </>
    )
}