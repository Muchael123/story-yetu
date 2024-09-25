"use client";
import Image from 'next/image';
import React, { useState } from 'react'

export interface optionList { 
  label: string;
  imageUrl: string;
  isFree: boolean;
}
function StoryType({userSelection}: any) {
    const storyList = [
      {
        label: "Story Book",
        imageUrl: "/storybook.jpg",
        isFree: true,
      },
      {
        label: "Bed Story",
        imageUrl: "/bedtime.jpg",
        isFree: true,
      },
      {
        label: "Educational Story",
        imageUrl: "/school.jpg",
        isFree: true,
      },
      
    ];
  const [selectedStory, setSelectedStory] = useState<string>('');
  const onUserSelect = (story: optionList) => { 
    setSelectedStory(story.label);
    userSelection({
      fieldName: "Type",
      fieldValue: story.label,
    })
  }
  return (
    <div>
      <label className="text-primary md:text-2xl text-xl font-semibold lg:text-4xl">
        2. What type of story are you creating?
      </label>
      <div className="grid grid-cols-2  lg:grid-cols-3 gap-2 lg:gap-5 mt-3 p-3 ">
        {storyList.map((story: optionList, index) => (
          <div
            key={index}
            onClick={() => onUserSelect(story)}
            className={`relative rounded-3xl  hover:cursor-pointer hover:grayscale-0 ease-in-out hover:scale-110 p-1 duration-200 ${
              selectedStory === story.label
                ? "grayscale-0 border-2 border-gray-600 scale-110"
                : "grayscale"
            }`}
          >
            <h2 className="absolute bottom-5 lg:left-6 text-white font-bold text-lg md:text-xl lg:text-2xl text-center">
              {story.label}
            </h2>
            <Image
              src={story.imageUrl}
              alt={story.label}
              width={300}
              height={400}
              className="object-cover h-[150px] md:h-[250px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryType