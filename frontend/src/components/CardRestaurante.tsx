import RestauranteOutput from "@/DTOs/outputs/RestauranteOutput";
import { useRouter } from "next/navigation";

export default function CardRestaurante({restaurante} : {restaurante: RestauranteOutput}) {
    const router = useRouter();

    return(
        <button
          className="border border-black mt-4 flex items-center lg:w-[60%] sm:w-[50%] w-[80%] rounded-lg hover:bg-gray-50"
          onClick={() => router.push(`/infoRestaurante?id=${restaurante.id}`)}
        >
            <img src={restaurante.fotoUrl} className="rounded-l-lg lg:w-[120] sm:w-[90] w-[70] " alt={`Foto do restaurante ${restaurante.nome}`} />
            <div className="text-start sm:pl-4 pl-2 lg:text-base sm:text-xs text-[9px] flex flex-col lg:gap-0 gap-1">
                <h2>{restaurante.nome}</h2>
                <p>{restaurante.endereco}</p>
                <p>{restaurante.telefone}</p>
            </div>
        </button>
    )
}