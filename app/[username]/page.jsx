"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { fetchUserForm, instance } from '@/actions/useractions'
import Script from "next/script"
import { fetchUser, fetchPayment } from '@/actions/useractions'
import { User } from 'lucide-react'
import { useParams } from 'next/navigation'
// import Router from 'next/router'
import { useRouter } from 'next/navigation'

const page = () => {
    const { data: session } = useSession()
    const router = useRouter()






    const { username } = useParams()
    console.log("Username: ", username)
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [paymentform, setPaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })
    const [profilePic, setProfilePic] = useState()
    const [coverPic, setCoverPic] = useState()

    useEffect(() => {
        getData()
    }, [])

    let total = 0
    const count = () => {
        for (const money of payments) {
            console.log("Amount: ", money.amount)
            total = total + money.amount
            console.log("Total: ", total)
        }
        return total
    }
    console.log(payments)

    const getData = async () => {
        const u = await fetchUser(username)
        setCurrentUser(u)
        console.log("user: ", u)
        const p = await fetchPayment(username)
        setPayments(p)
        const f = await fetchUserForm(username)
        setProfilePic(f.profilePic)
        setCoverPic(f.coverPic)


    }

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {
        // console.log("we are in pay")
        // console.log(instance)
        const a = await instance(amount, session.user.username, paymentform)
        // console.log("Something : ", a)
        const orderId = a.id
        // console.log("Order id: ", orderId)

        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount * 100, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                name: paymentform.name,
                email: session.user.email,
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        // e.preventDefault();



    }


    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />
            <div className="min-h-[calc(100vh-64px)] bg-[linear-gradient(94.3deg,rgba(26,33,64,1)_10.9%,rgba(81,84,115,1)_87.1%)]  text-[#d6d6d6] ">
                <div className="w-full max-w-400 flex flex-col  m-auto ">

                    <div className='w-full relative flex justify-center h-58 sm:h-106'>
                        <div className='w-full h-25 sm:h-89'>
                            <img className='object-fill sm:object-fill h-46 sm:h-92 w-full' src="cov.jpg" alt="" />
                        </div>
                        <div className='h-27 w-27 sm:h-32 sm:w-32 rounded-[50%] overflow-hidden flex m-auto bg-gray-300 absolute bottom-0'>
                            <img className='object-cover h-full w-full' src="me.jpeg" alt="" />
                        </div>
                    </div>
                    <div className='flex justify-center items-center font-bold pt-1'>@{session?.user?.username}</div>
                    <div className='flex justify-center items-center  '>Lets help {username} get a Chai</div>
                    <div className='flex justify-center items-center '>{payments.length} payments | {count()}  raised </div>

                    <div className=' flex flex-col sm:flex-row gap-5 justify-center items-center sm:items-start my-5 mb-12'>
                         <div className='bg-gray-800 rounded-[5px] w-[75%] sm:w-[36%]  p-7 h-75 flex flex-col justify-start items-start'>
                            <p className='font-bold pb-2 text-2xl'>Make a payment</p>
                            <div className='flex flex-col gap-3 w-full'>
                                <Input
                                    name="name"
                                    value={paymentform.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                    className="border-gray-500"
                                />
                                <Input
                                    name="message"
                                    value={paymentform.message}
                                    onChange={handleChange}
                                    placeholder="Enter message"
                                    className="border-gray-500"
                                    />
                                <Input
                                    name="amount"
                                    value={paymentform.amount}
                                    onChange={handleChange}
                                    placeholder="Enter amount"
                                    className="border-gray-500"
                                    />
                            </div>
                            <Button className="w-full my-2" onClick={() => { pay(Number(paymentform.amount)) }}>Pay</Button>
                            <div className='flex  gap-3'>
                                <Button onClick={() => { pay(100) }}>$10</Button>
                                <Button onClick={() => { pay(200) }}>$20</Button>
                                <Button onClick={() => { pay(300) }}>$30</Button>
                            </div>

                        </div>
                        <div className='bg-gray-800  rounded-[5px] w-[75%] sm:w-[36%]  p-7 h-75 flex flex-col justify-start items-start gap-1.5 overflow-scroll scroll-smooth no-scrollbar'>
                            <p className='font-bold pb-2'>Supporters</p>
                            {
                                payments.map((e) => (
                                    <div key={e._id} className='flex justify-center items-center gap-1.5'>
                                        <div className='h-full flex justify-start items-start pt-[1.5px]'>
                                            <div className='bg-gray-500 h-5 w-5 rounded-[50%] flex justify-center items-center'><User size={17} /></div>
                                        </div>
                                        <p>{e.name} datend {e.amount} with a message "{e.message}"</p>
                                    </div>
                                ))
                            }

                        </div>
                       
                    </div>

                </div>
            </div>
        </>
    )
}

export default page
