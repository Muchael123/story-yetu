import Image from 'next/image';
import React, { useState } from 'react'
import { optionList } from './StoryType';

function AgeGroup({userSelection}: any) {
  const ageList = [
    {
      label: "0 -2 Years",
      imageUrl: "/02years.jpg",
      isFree: true,
    },
    {
      label: "3 - 5 Years",
      imageUrl: "/35years.jpeg",
      isFree: true,
    },
    {
      label: "6 - 8 Years",
      imageUrl: "/58years.jpg",
      isFree: true,
    },
  ];
  const [selectedStory, setSelectedStory] = useState<string>("");
   const onUserSelect = (story: optionList) => {
     setSelectedStory(story.label);
     userSelection({
       fieldName: "AgeGroup",
       fieldValue: story.label,
     });
   };
  return (
    <div>
      <label className="text-primary text-4xl">
        3. What age group is your story for?
      </label>
      <div className="grid grid-cols-3 gap-5 mt-3 p-3 ">
        {ageList.map((age, index) => (
          <div
            key={index}
            onClick={() => onUserSelect(age)}
            className={`relative rounded-3xl  hover:cursor-pointer hover:grayscale-0 ease-in-out hover:scale-110 p-1 duration-200 ${
              selectedStory === age.label
                ? "grayscale-0 border-2 border-gray-600 scale-110"
                : "grayscale"
            }`}
          >
            <h2 className="absolute bottom-5 text-white font-bold text-2xl text-center">
              {age.label}
            </h2>
            <Image
              src={age.imageUrl}
              alt={age.label}
              width={300}
              height={400}
              className="object-cover h-[250px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgeGroup