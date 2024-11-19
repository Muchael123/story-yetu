import React from 'react'
import DashboardHeader from './_components/DashboardHeader'
import StoryList from './_components/StoryList'

function Dashboard() {
  return (
    <div className='px-10 md:px-20 lg:px-40'>
      <title>My Site: Contact Us</title>
      <DashboardHeader />
      <StoryList  />
    </div>
  )
}

export default Dashboard