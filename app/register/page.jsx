"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        setError("")
        setMessage("")

        if (password != confirmPassword) {
            setError("Your password does not match")
            return;
        }
        try {


            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Registration failed")
                setSubmitting(false)
                return;
            }
            setMessage("User Successfully registered")
            setTimeout(() => {
                setMessage("")
                router.push("/login")
            }, 3000);

        } catch (error) {
            setError(error || "Something went wrong");
  setSubmitting(false);
        }
    }



    return (
        <div className='h-[calc(100vh-64px)] w-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='border border-gray-400 rounded-[5px] '>
                <div className='p-5 sm:p-9 flex flex-col gap-3 pb-0'>


                    <h1 className='font-bold text-4xl'>Register User</h1>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Username</label>
                        <input
                            id='username'
                            type="text"
                            value={username}
                            placeholder='Enter your username'
                            onChange={(e) => { setUsername(e.target.value) }}
                            className='border border-gray-400 rounded-[5px] p-2 w-65 sm:w-80'
                        />
                    </div>
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
                    <div className='flex flex-col'>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            id='confirmPassword'
                            type="password"
                            value={confirmPassword}
                            placeholder='Enter your password'
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            className='border border-gray-400 rounded-[5px] p-2 w-65 sm:w-80'
                        />
                    </div>
                    <Button disabled={submitting}  type='submit' >Submit</Button>
                    <div className='flex items-center justify-center gap-2'>
                        <p>Already have an account?</p>
                        <Link href={"/login"} className='text-blue-500'>Login</Link>
                    </div>

                </div>

                <div className='h-5 w-full flex flex-col justify-center items-center pb-10 pt-2'>
                    {error && (
                        
                        <div className='text-red-600 font-bold  m-auto'>{error}</div>
                    )}
                    {message && (
                        <div className='text-green-600 font-bold  m-auto'>{message}</div>
                    )}
                </div>
            </form>

        </div>
    )
}

export default page
