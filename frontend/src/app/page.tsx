"use client"

import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent,  useState,  } from 'react';
import { auth } from '../../firebase';
import {CircularProgress} from "@nextui-org/progress";

export default function Login() {
    const router = useRouter();
    // const { usuarioLogado, atualizarUsuarioLogado } = useContext(UserContext);
    const [logando, setLogando] = useState(false);
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleSenha = (e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value);

    const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLogando(true);
    
        try {
            // Faz login com o Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
    
            // Obtém o token do usuário autenticado
            const token = await user.getIdToken();
            console.log(token);
    
            router.push("/restaurantes");
    
        } catch (e) {
            alert(`Erro no login!`);
            console.error(e);
        } finally {
            setLogando(false);
        }
    };
    

    return (
        <main className="flex flex-col w-screen h-screen justify-center items-center bg-[#5992FF] ">
            <form onSubmit={submitLogin} className="text-lg bg-white w-[400px] p-9 py-20 rounded-3xl flex flex-col justify-center items-center">
                <h1 className="text-3xl mb-20 font-semibold">LOGIN</h1>
                <input 
                    className="pb-1 w-full border-b-[3px] border-slate-300 placeholder:text-black placeholder:text-xl" 
                    placeholder="Email" 
                    type="email" 
                    autoComplete="email" 
                    onChange={handleEmail} 
                    value={email} 
                />
                <input 
                    className="mt-10 pb-1 w-full border-b-[3px] border-slate-300 placeholder:text-black placeholder:text-xl" 
                    type="password" 
                    placeholder="Senha" 
                    autoComplete="current-password" 
                    onChange={handleSenha} 
                    value={senha} 
                />
                <button 
                    type="submit" 
                    className="text-lg mt-24 bg-primary py-2 px-12 text-white rounded-full hover:px-14 transition-all duration-200">
                    {logando 
                        ? <CircularProgress size='sm' color='secondary' strokeWidth={4}/>
                        : "Logar"

                    }
                </button>
            </form>
        </main>
    );
}
