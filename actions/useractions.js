"use server"

import { dbConnect } from "@/lib/db"
import Payment from "@/models/Payment";
import User from "@/models/User";
import UserForm from "@/models/UserForm";
import Razorpay from "razorpay"
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { connect } from "mongoose";


export const instance = async (amount, to_username, paymentform) => {
    try {
        await dbConnect();

        var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })
        // instance.orders.create({
        //     amount: 50000,
        //     currency: "<currency>",
        //     receipt: "receipt#1",
        //     notes: {
        //         key1: "value3",
        //         key2: "value2"
        //     }
        // })

        let options = {
            amount: Number(amount) * 100,
            currency: "INR"
        }

        let x = await instance.orders.create(options)

        await Payment.create({ oid: x.id, amount: Number(amount), to_user: to_username, name: paymentform.name, message: paymentform.message })

        return x

    } catch (error) {
        console.error(error);
        throw new Error("Order creation failed");

    }
}


export const fetchUser = async (username) => {
    await dbConnect()

    const user = await User.findOne({ username }).lean()

    if (!user) return null

    return JSON.parse(JSON.stringify(user))
}

export const fetchPayment = async (username) => {
    await dbConnect()

    const pay = await Payment.find({
        to_user: username,
        done: true
    })
        .sort({ amount: -1 })
        .limit(10)
        .lean()

    // 🔥 Force plain JSON serialization
    return JSON.parse(JSON.stringify(pay))
}


// export async function POST(request) {
//     const { data: session } = useSession()
//     try {
//         const { data } = request.json()

//         if (!data.name || !data.username || !data.profilepPic || !data.coverPic || !data.razorpayId || !data.razorpaySecret) {
//             throw new Error("Missing fields")
//         }

//         await dbConnect()

//         // const username = data.username
//         let username;
//         if (session) {
//             username = session.username
//         }

//         const userExists = UserForm.findOne({ username })
//         if (userExists) {
//             await UserForm.updateOne({ data })
//         }
//         else {
//             UserForm.create({
//                 name: data.name,
//                 profilepPic: data.profilepPic,
//                 coverPic: data.coverPic,
//                 razorpayId: data.razorpayId,
//                 razorpaySecret: data.razorpaySecret
//             })
//         }
//         console.log("User updated")

//         return NextResponse.json(
//             { message: "User data updated successfully" },
//             { status: 200 }
//         )

//     } catch (error) {
//         return NextResponse.json(
//             { error: "Something went wrong", error },
//             { status: 500 }
//         )
//     }
// }

export const fetchUserForm = async(username)=>{
    await dbConnect();

    const res = await UserForm.findOne({ username }).lean()
    if (!res) return null

    return JSON.parse(JSON.stringify(res))
}