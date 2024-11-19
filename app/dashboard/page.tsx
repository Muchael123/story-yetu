"use client";
import React, { useEffect } from 'react'
import DashboardHeader from './_components/DashboardHeader'
import StoryList from './_components/StoryList'


function Dashboard() {
  useEffect(() => {
    document.title = "story-yetu | Dashboard";
  }, []);
  return (
    <div className='px-10 md:px-20 lg:px-40'>
  
      
      <DashboardHeader />
     
      <StoryList  />
    </div>
  )
}

export default Dashboard