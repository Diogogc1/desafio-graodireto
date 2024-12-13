"use client"

import CartContext from "@/contexts/CartContext"
import { AuthContext } from "@/contexts/UserContext"
import itemPedidoInput from "@/DTOs/inputs/ItemPedidoInput"
import PedidoInput from "@/DTOs/inputs/PedidoInput"
import PedidoOutput from "@/DTOs/outputs/PedidoOutput"
import pedidoService from "@/services/PedidoService"
import { useContext, useEffect, useState } from "react"

export default function Carrinho(){
    const {cartItems} = useContext(CartContext)
    const {usuarioLogado} = useContext(AuthContext)
    const [precoTotal, setPrecototal] = useState(0)

    useEffect(() => {
        const precos = cartItems.map((item) => item.itemCardapioOutput.preco)
        var valorTotal = 0;
        precos.forEach((preco) => valorTotal += preco)
        setPrecototal(valorTotal)
    }, [])

    async function confirmarPedido(){
        const pedidoInput: PedidoInput = {
            idRestaurante: cartItems[0].itemCardapioOutput.restauranteOutput.id,
            idUser: usuarioLogado.id,
            data: new Date(Date.now())
        }

        try{
            const pedidoOutput: PedidoOutput = await pedidoService.create(pedidoInput)

            cartItems.forEach((item) => {
                const itemPedidoInput: itemPedidoInput = {
                    idItemCardapio: item.itemCardapioOutput.id,
                    idPedido: pedidoOutput.id,
                    quantidade: item.quantidade
                }
            })

            alert("Pedido confirmado com sucesso!")
        }catch(e){
            alert("Erro ao confimar pedidos")
            console.error(e)
        }
    }

    return (
        <>
            <h1>Carrinho</h1>
            {cartItems.map((item) => { 
                return(
                    <div key={item.itemCardapioOutput.id}>
                        <h2>{item.itemCardapioOutput.nome}</h2>
                        <p>{item.itemCardapioOutput.preco}</p>
                        <p>{item.quantidade}</p>
                    </div>
                )
            })}

            <h2>O preço total é {precoTotal}</h2>

            <button onClick={confirmarPedido}>Confirmar Pedido</button>
        </>
    )
}