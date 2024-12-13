"use client"

import CartContext from "@/contexts/CartContext"
import ItemCardapioOutput from "@/DTOs/outputs/ItemCardapioOutput"
import itemCardapioService from "@/services/ItemCardapioService"
import { useRouter, useSearchParams } from "next/navigation"

import { useCallback, useContext, useEffect, useState } from "react"

export default function InfoItemCardapio() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [itemCardapio, setItemCardapio] = useState<ItemCardapioOutput>()
    const router = useRouter()


    const {addToCart, cartItems} = useContext(CartContext)

    const fetchItemCardapio = useCallback(async () => {
        try {
            const response: ItemCardapioOutput = await itemCardapioService.getById(id!)
            setItemCardapio(response)
        } catch (error) {
            console.error(error)
        }
    }, [id])

    useEffect(() => {
        if(id != null){
            fetchItemCardapio()
        }
    }, [id, fetchItemCardapio])

    async function addPedido(){
        addToCart(itemCardapio!)

        alert("Item adicionado ao carrinho!")
    }

    return(
        <>
            <h1>Informações do Item do Cardápio</h1>
            {itemCardapio && (
                <div>
                    <h2>{itemCardapio.nome}</h2>
                    <p>{itemCardapio.descricao}</p>
                    <p>{itemCardapio.preco}</p>
                </div>
            )}

            <h2>Carrinho</h2>
            {cartItems.map((item) => (
                <div key={item.itemCardapioOutput.id}>
                    <p>{item.itemCardapioOutput.nome}</p>
                    <p>{item.quantidade}</p>
                </div>

            ))}

            <button onClick={addPedido}>Adicionar ao carrinho</button>

            <button onClick={() => router.back()}>voltar</button>
        </>
    )
}