"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

function Login() {
     
  const host = process.env.NEXT_PUBLIC_LOCAL_HOST
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {login, setLoading} = useAuth()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await fetch(`${host}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },  
        body: JSON.stringify({ email, password })
      });
      const json = await response.json();
      if(json.success){
        toast.success(json.message)
        login(json.user, json.auth_token)
        router.push('/')
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
    <div className="text-white relative w-full h-screen overflow-hidden font-montserrat flex flex-col justify-center items-center">
      <div className="mt-10 p-8 rounded-lg bg-gray-800/30">
        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-[500px]">
          <label htmlFor="email" className="font-bold pl-1">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="textField" placeholder='enter your email' />

          <label htmlFor="password" className="pl-1 font-bold mt-2">Password </label>
          <div className="relative flex flex-col">
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="textField" placeholder='enter your password' />
          </div>

          <button className="mt-4 rounded-full w-fit m-auto font-bold px-10 py-2 outline outline-blue-500 hover:bg-blue-400 active:scale-95 transition duration-200 ease-in-out">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login