"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

function Signup() {

    const host = process.env.NEXT_PUBLIC_LOCAL_HOST
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {setLoading} = useAuth()

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) =>  {
        e.preventDefault();
     
        try {
            setLoading(true)
            const response = await fetch(`${host}/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },  
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            if(json.success){
                router.push('/Login')
                toast.success(json.message)
                setLoading(false);
              }
              else{
                if(json.Esuccess)
                    toast.error(json.errors[0].msg)
                else
                    toast.error(json.message)
            }
            setLoading(false);
        } catch (error: any) {
            toast.error(`Internal server error: ${error.message}`)
          }
    }

    return (
        <div className="text-white relative h-screen overflow-hidden font-montserrat flex flex-col justify-center items-center">
            <div className="p-8 rounded-lg bg-gray-800/30">
                <form onSubmit={handleSignIn} className='flex flex-col gap-2 w-[500px]'>
                    <label htmlFor="username" className="font-bold pl-1">UserName</label>
                    <input type="text" id="username" value={name} onChange={e => setName(e.target.value)} className="textField" placeholder='enter your email' />

                    <label htmlFor="email" className="font-bold pl-1 mt-2">Email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="textField" placeholder='enter your email' />

                    <label htmlFor="password" className="pl-1 font-bold mt-2">Password </label>
                    <div className="relative flex flex-col">
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="textField" placeholder='enter your password' />
                    </div>

                    <button type='submit' className="mt-4 rounded-full w-[60%] m-auto font-bold px-10 py-2 outline outline-blue-500 hover:bg-blue-400 active:scale-95 transition duration-200 ease-in-out">Sign Up</button>
                </form>
                <Link href='/Login'>
                    <button className="mt-5 w-full font-bold px-3 py-2 rounded-lg bg-gray-700/30">Already a user ?</button>
                </Link>
            </div>
        </div>
    )
}

export default Signup