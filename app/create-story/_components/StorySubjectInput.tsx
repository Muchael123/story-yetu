'use client'
import React from 'react'
import { Textarea } from "@nextui-org/input";

function StorySubjectInput({ userSelection }: any) {
  return (
    <div>
      <label className="text-primary text-4xl">
        1. What is your story about?
      </label>
      <Textarea
        size="lg"
        placeholder="Write the subject of your story here"
        classNames={{
          input: "resize-y min-h-[200px] text-2xl p-4",
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