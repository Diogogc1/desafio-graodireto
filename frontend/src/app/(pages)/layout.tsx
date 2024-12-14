"use client"

import { CartProvider } from "@/contexts/CartContext";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { ForkKnife, ClockCounterClockwise, ShoppingCartSimple, SignOut} from "@phosphor-icons/react";
import ItemNav from "@/components/ItemNav";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Desloga o usuário do Firebase
      router.push("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <AuthContextProvider>
      <CartProvider>
        <div className="flex w-screen h-screen">
          <nav className="lg:w-64 sm:w-44 w-auto bg-primary text-white flex flex-col items-start p-4">
            <h1 className="sm:text-2xl text-xl font-bold mb-6">Menu</h1>
            <div className="flex flex-col gap-4 justify-between h-full w-full">
              <div className="flex flex-col gap-4">
                <ItemNav Icon={ForkKnife} href="/restaurantes" text="Restaurante" />
                <ItemNav Icon={ClockCounterClockwise} href="/pedidos" text="Pedidos" />
                <ItemNav Icon={ShoppingCartSimple} href="/carrinho" text="Carrinho" />
              </div>

              <button className="bg-red-500 p-2 rounded-lg text-white flex items-center" onClick={handleLogout}>
                <SignOut className="text-[30px]" color="#e3e3e3" weight="fill" />
                <p className="sm:block hidden">Deslogar</p>
              </button>
            </div>
          </nav>

          <div className="flex-1 flex flex-col items-center">
            {children}
          </div>
        </div>
      </CartProvider>
    </AuthContextProvider>
  );
}
