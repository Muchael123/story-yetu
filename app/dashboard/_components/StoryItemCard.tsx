import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { div } from 'framer-motion/client';
import Link from 'next/link';


function StoryItemCard({ story }: any) {
  return (
    <Link href={'/view-story/'+story.storyId}>
      <Card
        isFooterBlurred
        className="w-full h-[300px] hover:scale-105 transition-all cursor-pointer col-span-12 sm:col-span-5"
      >
        <Image
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={story.coverimage}
          width={500}
          height={500}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black font-semibold">{story.storySubject}</p>

          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Read Book
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default StoryItemCard