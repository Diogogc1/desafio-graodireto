"use client"

import { onAuthStateChanged } from 'firebase/auth';
import React, { useCallback, useEffect, useState } from 'react';
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

    const atualizarUsuarioLogado = useCallback((usuario: UserOutput) => {
        setUsuarioLogado(usuario)
    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try{
                    const usuarioLogadoAtualizado = await userService.getByUid(user.uid);
                    setCarregando(false)
                    atualizarUsuarioLogado(usuarioLogadoAtualizado);
                }catch(error){
                    throw new Error(`${error}`)
                }
                
            } else {
                router.push('/')
            }
        });

        return () => unsubscribe(); 
    }, [atualizarUsuarioLogado, router]);

    return (
        <AuthContext.Provider value={{ usuarioLogado, atualizarUsuarioLogado, carregando }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }