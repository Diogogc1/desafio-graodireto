import PedidoOutput from "@/DTOs/outputs/PedidoOutput";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function CardPedido({ pedido }: { pedido: PedidoOutput }) {
    const router = useRouter();

    return (
        <button 
            className="border p-4 py-10 gap-1 border-black mt-4 flex flex-col text-start justify-center h-16 sm:w-[60%] w-[70%] rounded-lg hover:bg-gray-50"
            onClick={() => router.push(`/infoPedido?id=${pedido.id}`)}
        >
            <h2 className="font-semibold">{`Restaurante: ${pedido.restauranteOutput.nome}`}</h2>
            <p>{`Data: ${moment(pedido.data).format('DD/MM/YYYY')}`}</p>
        </button>
    )
}