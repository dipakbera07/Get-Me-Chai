
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db"
import UserForm from "@/models/UserForm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        const data = await request.json()

        if (!data.name || !data.username || !data.profilePic || !data.coverPic || !data.razorpayId || !data.razorpaySecret) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            )
        }
        const username = data.username
        
        await dbConnect()
        const userExists = await UserForm.findOne({ username })
        if (userExists) {
            await UserForm.updateOne(
                { username },
                {
                    $set: {
                        name: data.name,
                        username: data.username,
                        profilePic: data.profilePic,
                        coverPic: data.coverPic,
                        razorpayId: data.razorpayId,
                        razorpaySecret: data.razorpaySecret
                    }
                }
            )
        }
        else {
            await UserForm.create({
                name: data.name,
                username: data.username,
                profilePic: data.profilePic,
                coverPic: data.coverPic,
                razorpayId: data.razorpayId,
                razorpaySecret: data.razorpaySecret
            })
        }

        return NextResponse.json(
            { message: "User data updated successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong", error: error.message },
            { status: 500 }
        )
    }
}