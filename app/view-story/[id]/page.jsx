"use client";
import { db } from "@/config/db";
import { storyData } from "@/config/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import CoverPage from "./_components/CoverPage";
import StoryPages from "./_components/StoryPages";
import LastPage from "./_components/LastPage";
import { Button } from "@nextui-org/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BiSolidRightArrowCircle,
  BiSolidLeftArrowCircle,
} from "react-icons/bi";

function ViewStory({ params }) {
  const [story, setStory] = useState(null); // Initialize as null
  const errorNotify = (message) => toast.error(message);
  const notify = (message) => toast.success(message);
  const bookRef = useRef();
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // State to track if it's mobile screen

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Consider screens <= 768px as mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getStory();
  }, []);

  

  const getStory = async () => {
    try {
      const res = await db
        .select()
        .from(storyData)
        .where(eq(storyData.storyId, params.id));
      setStory(res[0]);
      notify("Happy reading");
    } catch (e) {
      console.log(e);
      errorNotify("Check your internet connection");
    }
  };

  return (
    <div className="px-4 md:px-20 lg:px-40 overflow-x-clip">
      <ToastContainer />
      <h2 className="font-bold text-xl md:text-2xl lg:text-4xl p-3 md:p-5 text-white bg-primary">
        {story?.output?.story_title}
      </h2>
      <div className="md:relative flex justify-center items-center pt-3">
        {story && (
          //   @ts-ignore
          <HTMLFlipBook
            ref={bookRef}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            height={500}
            width={500} // default width for non-responsive handling
            useMouseEvents={isMobile} // Enable mouse events on small screens
            mobileScrollSupport={false}
            style={{
              width: "95%",
              height: 'auto'
            }}
            className="md:my-5 my-1 rounded-lg w-full sm:w-96 md:w-[500px] lg:w-[600px] xl:w-[800px]"
          >
            <div>
              <CoverPage imageUrl={story.coverimage} />
            </div>
            {story?.output?.chapters?.map((chapter, index) => (
              <div key={index} className="bg-white md:p-7 lg:p-10 p-1">
                <StoryPages storyChapter={chapter} />
              </div>
            ))}
            <div>
              <LastPage />
            </div>
          </HTMLFlipBook>
        )}

        {!isMobile && count < story?.output?.chapters?.length - 1 && (
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
        {!isMobile && count > 0 && (
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

export default ViewStory;
