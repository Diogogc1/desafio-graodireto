"use client"

import CardCartItem from "@/components/CardCartItem"
import { AuthContext } from "@/contexts/AuthContext"
import CartContext from "@/contexts/CartContext"

import itemPedidoInput from "@/DTOs/inputs/ItemPedidoInput"
import PedidoInput from "@/DTOs/inputs/PedidoInput"
import PedidoOutput from "@/DTOs/outputs/PedidoOutput"
import itemPedidoService from "@/services/ItemPedidoService"
import pedidoService from "@/services/PedidoService"
import { useContext, useEffect, useState } from "react"

export default function Carrinho(){
    const {cartItems} = useContext(CartContext)
    const {usuarioLogado} = useContext(AuthContext)
    const [precoTotal, setPrecototal] = useState(0)

    useEffect(() => {
        var valorTotal = 0;
        cartItems.forEach((item) => valorTotal += (item.itemCardapioOutput.preco * item.quantidade))
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

            for (const item of cartItems) {
                const itemPedidoInput: itemPedidoInput = {
                    idItemCardapio: item.itemCardapioOutput.id,
                    idPedido: pedidoOutput.id,
                    quantidade: item.quantidade,
                };
                await itemPedidoService.create(itemPedidoInput);
            }
            
            alert("Pedido confirmado com sucesso!")
        }catch(e){
            alert("Erro ao confimar pedidos")
            console.error(e)
        }
    }

    return (
        <>
            <h1 className="text-2xl mt-4">Carrinho</h1>
            {cartItems.map((item) => { 
                return(
                    <CardCartItem key={item.itemCardapioOutput.id} cartItem={item} />
                )
            })}

            <h2 className="text-xl mt-8">O preço total é {precoTotal}</h2>

            <button className="bg-primary border-primary px-20 py-3 rounded-lg mt-6" onClick={confirmarPedido}>Confirmar Pedido</button>
        </>
    )
}