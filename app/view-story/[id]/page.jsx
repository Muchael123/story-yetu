'use client'
import { db } from '@/config/db'
import { storyData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from "react-pageflip";
import CoverPage from './_components/CoverPage'
import StoryPages from './_components/StoryPages'
import LastPage from './_components/LastPage'
import { Button } from '@nextui-org/button'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BiSolidRightArrowCircle,
  BiSolidLeftArrowCircle,
} from "react-icons/bi";

function ViewStory({ params }) {
    const [story, setStory] = useState(null) // Initialize as null
  const errorNotify = (message) => toast.error(message);
    const notify = (message) => toast.success(message);
  const bookRef = useRef();
  const [count, setCount] = useState(0)

    useEffect(() => { 
        getStory()
    }, [])
    const getStory = async () => { 
      try {
          const res = await db.select().from(storyData).where(eq(storyData.storyId, params.id));
        
        setStory(res[0])
        notify("Happy reading")
      } catch (e) {
        console.log(e)
        errorNotify("Check your internet connection")
       }
    }
  console.log(story?.output);

  return (
    <div className="px-10 md:px-20 lg:px-40">
      <ToastContainer />
      <h2 className="font-bold text-xl md:text-2xl lg:text-4xl p-5 text-white bg-primary">
        {story?.output?.story_title}
      </h2>
      <div className="relative">
        {story && (
          //   @ts-ignore
          <HTMLFlipBook
            ref={bookRef}
            width={500}
            useMouseEvents={false}
            className="my-5 rounded-lg"
            showCover={true}
            height={500}
          >
            <div>
              <CoverPage imageUrl={story.coverimage} />
            </div>
            {story?.output?.chapters?.map((chapter, index) => (
              <div key={index} className="bg-white p-10">
                <StoryPages storyChapter={chapter} />
              </div>
            ))}
            <div>
              <LastPage />
            </div>
          </HTMLFlipBook>
        )}

        {count < story?.output?.chapters?.length-1 && (
          <Button
            className="absolute top-[250px] -right-10 text-4xl"
            onClick={() => {
              bookRef.current.pageFlip().flipNext();
              setCount((prev) => prev + 1);
            }}
          >
            <BiSolidRightArrowCircle className="h-full text-primary" />
          </Button>
        )}
        {count > 0 && (
          <Button
            className="absolute top-[250px] -left-10 text-4xl"
            onClick={() => {
              bookRef.current.pageFlip().flipPrev();
              setCount((prev) => prev - 1);
            }}
          >
            <BiSolidLeftArrowCircle className="h-full text-primary" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default ViewStory