"use client"

import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import UserOutput from '@/DTOs/outputs/UserOutput';

interface userContext{
    usuarioLogado: UserOutput,
    atualizarUsuarioLogado: (usuario: UserOutput) => void,
    carregando: boolean
}

const UserContext = React.createContext<userContext>({
    usuarioLogado: new UserOutput(),
    atualizarUsuarioLogado: () => { },
    carregando: true
});

function UserContextProvider({
    children,
}: {
    children: React.ReactNode
}){
    const [usuarioLogado, setUsuarioLogado] = useState<UserOutput>(new UserOutput())
    const [carregando, setCarregando] = useState<boolean>(true)

    function atualizarUsuarioLogado(usuario: UserOutput) {
        setUsuarioLogado(usuario)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // if (user) {
            //     const usuarioLogadoAtualizado = await usuarioDAO.getOne(user.uid);
            //     setCarregando(false)
            //     atualizarUsuarioLogado(usuarioLogadoAtualizado);
            // } else {
            //     atualizarUsuarioLogado(new Usuario());
            // }
        
            setCarregando(false);
        });

        return () => unsubscribe(); 
    }, [atualizarUsuarioLogado]);

    return (
        <UserContext.Provider value={{ usuarioLogado, atualizarUsuarioLogado, carregando }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }