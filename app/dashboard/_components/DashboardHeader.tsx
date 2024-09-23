"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function DashboardHeader() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext)
  console.log(userDetails)
  return (
    <div className='p-7 bg-primary text-white flex justify-between items-center'>
      <h2 className='font-bold text-2xl lg:text-3xl'>My stories</h2>
      <div className='flex gap-3 text-xl justify-center items-center'>
        <Image src={'/coin.png'} alt={'coin'} height={50} width={60} />
        <span>{ userDetails?.credits} credits left</span>
      </div>
    </div>
  )
}

export default DashboardHeader