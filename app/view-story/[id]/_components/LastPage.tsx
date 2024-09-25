import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation';
import React from 'react'

function LastPage() {
    const router = useRouter();

  return (
    <div className="bg-primary p-10 h-full flex justify-center items-center flex-col gap-12">
      <h2 className="text-center text-2xl text-white">The End...</h2>
      <p className="text-center text-white text-xs">By wabunifu labs</p>
      <div className='flex flex-col items-center gap-4'>
        <Button className="flex justify-center items-center">
          Share Story
        </Button>
        <Button className="flex justify-center items-center" onClick={()=>router.push('/explore')}>See Other stories</Button>
        <Button className="flex justify-center items-center" onClick={()=> router.push('/create-story')}>
          Create New Story
        </Button>
      </div>
    </div>
  );
}

export default LastPage