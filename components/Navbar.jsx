"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import { useSession } from 'next-auth/react'


const Navbar = () => {

  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error)
    }
  }

  const { data: session } = useSession()
  console.log(session)
  const username = session?.user?.username

  return (
    <div className='  h-16 text-white flex  items-center bg-[#1c1d1e]'>
      <div className='w-screen max-w-400 flex justify-between items-center m-auto px-10 sm:px-22'>


        <div className='text-2xl'><Link href={"/"}>GetMeChai</Link></div>
        <div>
          {session ? (
            <>
              {/* <div className='h-10 w-10 rounded-[50%] flex justify-center items-center text-[23px]  bg-gray-600'>{session.user.email[0].toUpperCase()}</div> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className='border-none h-10 w-10 rounded-[50%] flex justify-center items-center text-[23px]  bg-gray-600'>{session.user.email[0].toUpperCase()}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <Link href={"/dashbord"}>
                      <DropdownMenuItem>Dashbord</DropdownMenuItem>
                    </Link>
                    <Link href={`/${username}`}>
                      <DropdownMenuItem>Your Page</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

            </>
            // <Link href={"/login"}><Button className="bg-white hover:bg-gray-200 text-black">Login</Button></Link>
          ) : (
            <Link href={"/login"}><Button className="border border-gray-500">Login</Button></Link>
          )}
        </div>

        </div>
      </div>
      )
}

      export default Navbar
