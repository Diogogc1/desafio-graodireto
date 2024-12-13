import { CartProvider } from "@/contexts/CartContext";
import { AuthContextProvider } from "@/contexts/UserContext";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     return (
        <AuthContextProvider>
          <CartProvider>
            <div className="flex flex-col w-screen h-screen items-center">
              {children}
            </div>
          </CartProvider>
        </AuthContextProvider>
    );
}
