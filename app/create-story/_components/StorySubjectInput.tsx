'use client'
import React from 'react'
import { Textarea } from "@nextui-org/input";

function StorySubjectInput({ userSelection }: any) {
  return (
    <div>
      <label className="text-primary md:text-2xl text-xl font-semibold lg:text-4xl">
        1. What is your story about?
      </label>
      <Textarea
        size="md"
        placeholder="Write the subject of your story here"
        classNames={{
          input: "resize-y h-[200px]  md:text-xl  lg:text-2xl md:p-4 p-2",
        }}
        className="mt-3 max-w-lg"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
}

export default StorySubjectInput