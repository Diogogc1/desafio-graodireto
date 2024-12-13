"use client"

import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import UserOutput from '@/DTOs/outputs/UserOutput';
import userService from '@/services/UserService';
import { useRouter } from 'next/navigation';

interface AuthContext{
    usuarioLogado: UserOutput,
    atualizarUsuarioLogado: (usuario: UserOutput) => void,
    carregando: boolean
}

const AuthContext = React.createContext<AuthContext>({
    usuarioLogado: {
        id: 0,
        nome: "",
        uidFirebase: ""
    },
    atualizarUsuarioLogado: () => { },
    carregando: true
});

function AuthContextProvider({
    children,
}: {
    children: React.ReactNode
}){
    const router = useRouter()
    const [usuarioLogado, setUsuarioLogado] = useState<UserOutput>({
        id: 0,
        nome: "",
        uidFirebase: ""
    })
    const [carregando, setCarregando] = useState<boolean>(true)

    function atualizarUsuarioLogado(usuario: UserOutput) {
        setUsuarioLogado(usuario)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try{
                    const usuarioLogadoAtualizado = await userService.getById(user.uid);
                    setCarregando(false)
                    atualizarUsuarioLogado(usuarioLogadoAtualizado);
                }catch(e){
                    throw new Error()
                }
                
            } else {
                router.push('/login')
            }
        });

        return () => unsubscribe(); 
    }, [atualizarUsuarioLogado]);

    return (
        <AuthContext.Provider value={{ usuarioLogado, atualizarUsuarioLogado, carregando }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }