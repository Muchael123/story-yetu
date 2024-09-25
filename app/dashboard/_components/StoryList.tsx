'use client'
import { db } from '@/config/db'
import { storyData } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { use, useState } from 'react'
import { useEffect } from 'react'
import StoryItemCard from './StoryItemCard'
import CustomLoader from '@/app/create-story/_components/CustomLoader'


type storyItem = {
  id: number;
  storySubject: string | null;
  storyType: string | null;
  ageGroup: string | null;
  imageStyle: string | null;
  output: [] | any;
  coverimage: string | null;
  storyId: string | null;
  userEmail: string | null;
  userName: string | null;
  userImage: string | null;
};

function StoryList() {

  const { user, isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState<boolean>();
  
  
  const [storyList, setStoryList] = useState<storyItem[]>()
  useEffect(() => {
    getStoryList();
  }, [isLoaded]);

  const getStoryList = async () => {
      setLoading(true);
      if (isLoaded) {
        const res = await db
          .select()
          .from(storyData)
          .where(
            eq(
              storyData.userEmail,
              user?.primaryEmailAddress?.emailAddress ?? ""
            )
          ).orderBy(desc(storyData.id));
        
        setStoryList(res);
        setLoading(false);
      }
      
    }
  
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
        {storyList && storyList.map((item: storyItem, index: number) => (
          <StoryItemCard key={index} story={ item} />
        )   
        )}
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  )
}

export default StoryList