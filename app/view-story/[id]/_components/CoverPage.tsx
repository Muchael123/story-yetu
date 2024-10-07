import Image from 'next/image'
import React from 'react'

function CoverPage({ imageUrl }: any) {
  return (
      <div>
          <Image src={imageUrl} className='w-full h-full object-fill' alt="cover image" width={500} height={500} />
    </div>
  )
}

export default CoverPage