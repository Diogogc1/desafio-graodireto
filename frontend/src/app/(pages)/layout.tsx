import { CartProvider } from "@/contexts/CartContext";
import { AuthContextProvider } from "@/contexts/UserContext";
import Link from "next/link";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <CartProvider>
        <div className="flex w-screen h-screen">
          <nav className="w-64 bg-gray-800 text-white flex flex-col items-start p-4">
            <h1 className="text-2xl font-bold mb-6">Menu</h1>
            <div className="flex flex-col gap-4">
              <Link href="/restaurantes">Restaurante</Link>

              <Link href="/pedidos">Pedidos</Link>
  
              <Link href="/carrinho">Carrinho</Link>

              {/* <Link href="/perfil">Perfil</Link> */}
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
