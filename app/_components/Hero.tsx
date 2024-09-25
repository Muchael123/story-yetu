import { Button } from '@nextui-org/button';
import { div } from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function Hero() {
    return (
      <div className="px-10 md:px-28 lg:px-44 mt-10 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="lg:text-7xl md:text-3xl text-xl text-primary font-extrabold">
              Create enchanting stories for children in just minutes.
            </h2>
            <p className="lg:text-2xl text-lg text-primary font-light">
              Spin joyful stories for young readers quickly, helping them dream
              big and have fun!
            </p>
            <Link href="/create-story">
              <Button
                color="primary"
                size="lg"
                className="mt-5 font-bold text-2xl p-8"
              >
                Create story
              </Button>
            </Link>
          </div>
          <div>
            <Image src={"/hero.png"} alt="hero" width={800} height={400} />
          </div>
        </div>
      </div>
    );
}

export default Hero