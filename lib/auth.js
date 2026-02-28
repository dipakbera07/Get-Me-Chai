import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Missing email or password")
                }

                try {
                    await dbConnect()

                    const exitingUser = await User.findOne({ email: credentials.email })
                    if (!exitingUser) {
                        throw new Error("User not found")
                    }

                    const isValid = await bcrypt.compare(credentials.password, exitingUser.password)
                    if (!isValid) {
                        throw new Error("Password is incorrect")
                    }

                    return {
                        id: exitingUser._id.toString(),
                        email: exitingUser.email,
                        username: exitingUser.username
                    }

                } catch (error) {
                    throw error
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // console.log("JWT USER:", user);
            // console.log("JWT TOKEN:", token);
            if (user) {
                token.id = user.id
                token.email = user.email
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            // console.log("SESSION TOKEN:", token);
            if (session.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.username = token.username
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
        error: "/auth/error"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
};