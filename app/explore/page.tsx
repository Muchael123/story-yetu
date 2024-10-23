"use client";
import { db } from "@/config/db";
import { storyData } from "@/config/schema";
import { desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@nextui-org/button";
import Loading from "../dashboard/_components/Loading";

function Explore() {
  const [offset, setOffset] = useState<number>(0);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const notify = (message: string) => toast.done(message);
  const errNotify = (message: string) => toast.error(message);

    useEffect(() => {
    getFirstStory()// Initial load with offset 0
  }, []);
    
    const getFirstStory = async () => {
        setLoading(true)
        try {
            const res = await db
                .select()
                .from(storyData)
                .orderBy(desc(storyData.id))
                .limit(4)
                .offset(0);
            setStories(res);
            setOffset(4);
            notify("Stories fetched");
        } catch (e) {
            console.log(e);
            errNotify("An error occurred");
        } finally {
            setLoading(false);
        }
    };

  const GetAllStories = async () => {
    setLoading(true);
    try {
      const res = await db
        .select()
        .from(storyData)
        .orderBy(desc(storyData.id))
        .limit(4)
        .offset(offset);
      setStories((prev) => [...prev, ...res]);
      setOffset(prev => prev+4); // Update the offset
      notify("Stories fetched");
    } catch (e) {
      console.log(e);
      errNotify("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
          <ToastContainer />
        <Loading isLoading={loading} />
      <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary">
        Explore More Stories
      </h2>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10">
        {stories.map((story, index) => (
          <StoryItemCard story={story} key={index} />
        ))}
      </div>
      <div className="w-full text-center flex justify-center mt-4">
              {!loading && (
            <Button
          color="primary"
          className="text-semibold text-white"
          onClick={() => GetAllStories()} // Fetch more stories and increment offset
          disabled={loading} 
        >
          {loading ? "Loading..." : "Get More"}
        </Button>)}
      </div>
    </div>
  );
}

export default Explore;
