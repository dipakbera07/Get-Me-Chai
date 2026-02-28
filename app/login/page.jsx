"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {signIn} from "next-auth/react"

const page = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const router = useRouter()

    const handleSubmit = async(e)=>{

        e.preventDefault()
        setSubmitting(true)

        const res = await signIn("credentials",{
            email,
            password,
            redirect:false
        });
        
        if(res?.error){
            setError(res.error)
            setSubmitting(false)
            return;
        }
        setMessage("User registered successfully")
        setTimeout(() => {
            router.push("/dashbord")
        }, 3000);

    }

    return (
        <div>
            <div className='h-[calc(100vh-64px)] w-screen flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='border border-gray-400 rounded-[5px] '>
                    <div className='p-5 sm:p-9 flex flex-col gap-3 pb-0'>


                        <h1 className='font-bold text-4xl'>Register User</h1>
                        <div className='flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input
                                id='email'
                                type="text"
                                value={email}
                                placeholder='Enter your email'
                                onChange={(e) => { setEmail(e.target.value) }}
                                className='border border-gray-400 rounded-[5px] p-2 w-65 sm:w-80'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password">Password</label>
                            <input
                                id='password'
                                type="password"
                                value={password}
                                placeholder='Enter your password'
                                onChange={(e) => { setPassword(e.target.value) }}
                                className='border border-gray-400 rounded-[5px] p-2 w-65 sm:w-80'
                            />
                        </div>
                        <Button type='submit' >Submit</Button>
                        <div className='flex items-center justify-center gap-2'>
                            <p>Create new account</p>
                            <Link href={"/register"} className='text-blue-500'>register</Link>
                        </div>

                    </div>

                    <div className='h-5 w-full flex justify-center items-center pb-12'>
                        {error && (
                            <div className='text-red-600 font-bold  m-auto'>{error}</div>
                        )}
                        {message && (
                            <div className='text-green-600 font-bold  m-auto'>{message}</div>
                        )}
                    </div>
                </form>

            </div>
        </div>
    )
}

export default page
