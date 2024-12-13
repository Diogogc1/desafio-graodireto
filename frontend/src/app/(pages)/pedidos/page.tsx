"use client"

import { AuthContext } from "@/contexts/UserContext"
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
            <h1>Pedidos</h1>
           
            {pedidos.map((pedido) => (
                <div key={pedido.id}>
                    <h2>{pedido.data.toString()}</h2>
                    <p>{pedido.restauranteOutput.nome}</p>
                </div>
            ))}
        </>
    )
}