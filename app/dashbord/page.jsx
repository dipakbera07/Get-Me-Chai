"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"


const page = () => {
    const { data: session } = useSession()
    const router = useRouter()
    // useEffect(() => {
    //       if (!session) {
    //         router.push("/login")
    //     }
    //     }, [])

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [coverPic, setCoverPic] = useState("")
    const [razorpayId, setRazorpayId] = useState("")
    const [razorpaySecret, setRazorpaySecret] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        setError("")
        setSubmitting(true)
        const username1 = session?.user?.username;

        if(username1 != username){
            setError("Enter correct username")
            setSubmitting(false)
            return
        }

        try {
            // const res = await fetch("/action",meth)
            const res = await fetch("/api/user-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name ,username , profilePic, coverPic, razorpayId, razorpaySecret }),
                credentials: "include"
            })

            const data = await res.json()
            if (!res.ok) {
                setError(data.error || "Failed to load user data")
                setSubmitting(false)
                return;
            }
            setMessage("User detailes successfully updated ")
            setTimeout(() => {
                setMessage("")
                router.push(`${username}`)
            }, 3000);
        } catch (error) {
            setError(error || "Something went wrong");
            setSubmitting(false);
        }

    }

    return (
        <div className="bg-[linear-gradient(94.3deg,rgba(26,33,64,1)_10.9%,rgba(81,84,115,1)_87.1%)] min-h-[calc(100vh-64px)] text-[#d6d6d6]">
            <div className="w-screen max-w-400 flex flex-col justify-between items-center m-auto">

                <form onSubmit={handleSubmit} className='w-70 sm:w-130 gap-3 py-7 flex flex-col justify-center items-center'>

                    <h1 className='font-bold text-[25px] sm:text-[30px]'>Welcome to your Dashbord</h1>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="name" className='font-bold'>Name</label>
                        <Input
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            id='name'
                            type="text"
                            placeholder='Enter your name'
                            className="h-10 bg-transparent"
                        ></Input>
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="username" className='font-bold'>Username</label>
                        <Input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            id='username'
                            type="text"
                            placeholder='Enter your username'
                            className="h-10"
                        ></Input>
                    </div>

                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="profilePic" className='font-bold'>Profile Picture</label>
                        <Input
                            value={profilePic}
                            onChange={(e) => { setProfilePic(e.target.value) }}
                            id='profilePic'
                            type="text"
                            placeholder='Enter your profilePic'
                            className="h-10"
                        ></Input>
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="coverPhoto" className='font-bold'>Cover Photo</label>
                        <Input
                            value={coverPic}
                            onChange={(e) => { setCoverPic(e.target.value) }}
                            id='coverPhoto'
                            type="text"
                            placeholder='Enter your coverPhoto'
                            className="h-10"
                        ></Input>
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="razorpayId" className='font-bold'>Razorpay ID</label>
                        <Input
                            value={razorpayId}
                            onChange={(e) => { setRazorpayId(e.target.value) }}
                            id='razorpayId'
                            type="text"
                            placeholder='Enter your Razorpay ID'
                            className="h-10"
                        ></Input>
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label htmlFor="razorpaysecret" className='font-bold'>Razorpay Secret</label>
                        <Input
                            value={razorpaySecret}
                            onChange={(e) => { setRazorpaySecret(e.target.value) }}
                            id='razorpaySecret'
                            type="text"
                            placeholder='Enter your razorpaysecret'
                            className="h-10"
                        ></Input>
                    </div>
                    <Button disabled={submitting} type="submit" className="w-full">Save</Button>
                </form>
                <div className=''>
                {error && (
                        <div className='text-red-600'>{error}</div>
                )}
                {message && (
                        <div className='text-green-600'>{message}</div>
                )}
                </div> 

            </div>
        </div>
    )
}

export default page
