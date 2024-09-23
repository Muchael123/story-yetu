import { Button } from '@nextui-org/button'
import React from 'react'

function LastPage() {
  return (
      <div className='bg-primary p-10 h-full flex justify-center items-center flex-col gap-12'>
          <h2 className='text-center text-2xl text-white'>The End...</h2>
            <p className='text-center text-white text-xs'>By wabunifu labs</p>
          <div>
              <Button className='flex justify-center items-center'>Share Story</Button>
          </div>
    </div>
  )
}

export default LastPage