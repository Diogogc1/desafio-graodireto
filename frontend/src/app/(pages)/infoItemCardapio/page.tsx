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
            alert("Erro ao retornar itens do cardapio!")
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
            <h1 className="sm:text-2xl text-base mt-4">Informações do Item do Cardápio</h1>
            {itemCardapio && (
                <div className="border border-black mt-4 flex items-center sm:w-[55%] w-[80%] rounded-lg hover:bg-gray-50">
                    <img src={itemCardapio.fotoUrl} className="rounded-l-lg sm:w-[140px] w-[90px]" alt={`Foto do item ${itemCardapio.nome}`} />
                        <div className="text-start sm:pl-4 pl-2 sm:text-base text-[9px]">
                            <h2 className="font-semibold">{itemCardapio.nome}</h2>
                            <p>{`Descrição: ${itemCardapio.descricao}`}</p>
                            <p>{`Preço: ${itemCardapio.preco}`}</p>
                        </div>
                    </div>
            )}


            <div className="flex sm:gap-10 gap-5 mt-10">
                <button className="border-2 border-primary sm:px-8 px-4 sm:py-3 rounded-lg text-sm" onClick={() => router.back()}>voltar</button>
                <button className="bg-primary border-primary px-6 py-3 rounded-lg text-sm" onClick={addPedido}>Adicionar ao carrinho</button>
            </div>
        </>
    )
}