import React from 'react'
import { FaRegPlayCircle } from "react-icons/fa";

function StoryPages({ storyChapter }: any) {
  const playSpeech = (speech: string) => {
    if (!speech) {
      console.error("No text to speak");
      return;
    }
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(speech);
    utterThis.onend = () => {
    };
    utterThis.onerror = (event) => {
      console.error("Speech synthesis error: ", event.error);
    };
    synth.speak(utterThis);
  };

    return (
      <div>
        <h2 className="text-2xl font-bold text-primary flex justify-between">
          {storyChapter?.chapter_title}
          <span
            className="text-3xl hover:cursor-pointer"
            onClick={() => playSpeech(storyChapter?.chapter_text)}
          >
            <FaRegPlayCircle />
          </span>
        </h2>
        <p className="text-xl p-10 mt-3 rounded-lg bg-slate-100">
          {storyChapter?.chapter_text}
        </p>
      </div>
    );
}

export default StoryPages