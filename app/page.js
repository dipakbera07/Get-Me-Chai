"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import { Users } from 'lucide-react';
import Link from "next/link";
import { useSession } from "next-auth/react";



export default function Home() {
  const {data:session}=useSession()
  const username = session?.user?.username
  return (
    <div className="bg-[linear-gradient(94.3deg,rgba(26,33,64,1)_10.9%,rgba(81,84,115,1)_87.1%)] min-h-[calc(100vh-64px)]  text-[#d6d6d6]">
      <div className="w-screen max-w-400 flex flex-col justify-between items-center m-auto ">

        <div className="px-10 md:px-30 flex flex-col justify-center items-center py-25 gap-2 ">
          <h1 className="text-4xl font-bold">Get Me Chai</h1>
          <p>A croud funding platform for creator to fund their platform</p>
          <p>A place where your fans can buy you a chai. unless the power of your fans get your project funded</p>
          <p className="text-white">Created by Dipak Bera</p>
          <div className="flex gap-3 py-2">
            <Link href={`/${username}`}><Button>Start Here</Button></Link>
            {/* <Button>Read More</Button> */}
          </div>
        </div>
        <div className="bg-[#1c1d1e] w-full h-0.5"></div>
        <div className="px-10 md:px-30 flex flex-col justify-center items-center py-10 gap-2 ">
          <h1 className="text-2xl font-bold">Your fans can buy you a chai</h1>
          <div className="flex flex-col sm:flex-row gap-12 justify-center items-center py-10 ">
            <div className="flex flex-col justify-center items-center ">

              <User className="size-12 sm:size-15" />
              <p className="font-bold">Fans want to help you</p>
              <p>Your fans are available to support you</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <CircleDollarSign className="size-12 sm:size-15" />
              <p className="font-bold">Fans want to help you</p>
              <p>Your fans are available to support you</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Users className="size-12 sm:size-15" />
              <p className="font-bold">Fans want to help you</p>
              <p>Your fans are available to support you</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
