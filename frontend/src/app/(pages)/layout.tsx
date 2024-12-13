import { AuthContext, AuthContextProvider } from "@/contexts/UserContext";
import { useContext } from "react";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     return (
        <AuthContextProvider>
            <div>
                {children}
            </div>
        </AuthContextProvider>
    );
}
