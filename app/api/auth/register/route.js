import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function POST(request) {
    try {
        const {username, email, password } = await request.json()

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Missing email or password" },
                { status: 400 }
            )
        }

        await dbConnect();
        console.log("Database successfully connected")
        console.log(username)

        const exitingUserName = await User.findOne({ username })
        if(exitingUserName){
            return NextResponse.json(
                { error: "Enter a unique username" },
                { status: 409 }
            )
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 201 }
            )
        } else {
            const hashedPassword = await bcrypt.hash(password,10)
            await User.create(
                {
                    username,
                    email,
                    password:hashedPassword
                }
            )
        }

        return NextResponse.json(
            { message: "User successfully registered" },
            { status: 200 }
        )

    } catch (error) {
    return NextResponse.json(
        { error: error.message || "Failed to register user" },
        { status: 500 }
    )
}



}