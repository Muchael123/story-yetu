import Image from 'next/image';
import React, { useState } from 'react'
import { optionList } from './StoryType';

function ImageStyle({userSelection}: any) {
  const ageList = [
    {
      label: "3D cartoon",
      imageUrl: "/3d.png",
      isFree: true,
    },
    {
      label: "Paper cut",
      imageUrl: "/papercut.jpeg",
      isFree: true,
    },
    {
      label: "Water color",
      imageUrl: "/water.webp",
      isFree: true,
    },
    {
      label: "Pixel art style",
      imageUrl: "/pixel.webp",
      isFree: true,
    },
  ];
  const [selectedStory, setSelectedStory] = useState<string>("");

  const onUserSelect = (story: optionList) => {
    setSelectedStory(story.label);
    userSelection({
      fieldName: "ImageStyle",
      fieldValue: story.label,
    });
  };

  return (
    <div>
      <label className="text-primary md:text-2xl text-xl font-semibold lg:text-4xl">
        4. What style of image would you like to use?
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 mt-3 p-3">
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
            <h2 className="absolute bottom-5 text-white font-bold text-xl md:text-2xl text-center">
              {age.label}
            </h2>
            <Image
              src={age.imageUrl}
              alt={age.label}
              width={300}
              height={400}
              className="object-cover h-[120px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageStyle