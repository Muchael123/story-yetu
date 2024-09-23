import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "write a kid story on description: An african setup, for {AgeGroup} years kids, {storyType} story,and all images on {imageStyle} style: {storySubject}. give me 5 chapters. With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in json fields formats",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
                "story_title": "The Boy Who Went to Magic School",
                "cover_image_prompt": "A paper cut style illustration of a boy with a bright red backpack and a curious expression, standing in front of a magical school building with swirling colorful windows and a sign that reads 'Magic School' in a whimsical font. The sky is a vibrant blue with stars and a full moon. The overall image should be cheerful and whimsical, showcasing the excitement of starting magic school.",
                "chapters": [
                  {
                    "chapter_title": "The Invitation",
                    "chapter_text": "Once upon a time, in a small town nestled amongst rolling hills, lived a boy named Timmy. Timmy was an ordinary boy who loved to play with his dog, Sparky, and dreamt of becoming a magician. One sunny afternoon, while Timmy was playing in his backyard, a small, shimmering envelope landed right in his hands. It was addressed to him, in elegant script, and said 'Timmy, you have been chosen.' Curious, Timmy opened the envelope. Inside, was a golden scroll with the words 'Welcome to Magic School' inscribed in swirling, magical letters. Timmy's eyes widened in amazement. He had been invited to magic school!",
                    "image_prompt": "Paper cut style illustration of Timmy holding the golden scroll with the words 'Welcome to Magic School' in swirling, magical letters. The background is a sunny, green backyard with a paper cut dog, Sparky, wagging its tail beside him. The overall image should be a bright, cheerful scene with a sense of anticipation and excitement."
                  },
                  {
                    "chapter_title": "Journey to Magic School",
                    "chapter_text": "Timmy packed his red backpack with his favorite toys and a few extra treats for Sparky. Then, he said goodbye to his parents and set off for Magic School. As he walked through the countryside, the trees seemed to whisper secrets and the flowers bloomed in every color imaginable. He met a talking squirrel who gave him directions and a friendly, grumpy gnome who offered him a magic bean for good luck. Finally, Timmy reached a magnificent castle perched on top of a cloud. It was Magic School!",
                    "image_prompt": "Paper cut style illustration of Timmy walking through a magical landscape with trees that whisper and colorful flowers. He passes by a talking squirrel and a grumpy gnome offering a magic bean. In the distance, the majestic Magic School castle appears on top of a cloud. The overall image should be whimsical and magical, capturing the journey to magic school."
                  },
                  {
                    "chapter_title": "Learning Magic",
                    "chapter_text": "Timmy entered the school and was amazed by what he saw. There were books that floated in the air, talking portraits on the walls, and even a classroom where they learned to make objects disappear! He met other students who were just as excited about magic as he was. They practiced spells, learned to fly on broomsticks, and even transformed into different animals! Timmy loved learning about magic and quickly became one of the best students in his class.",
                    "image_prompt": "Paper cut style illustration of Timmy inside the magical school. The scene should include floating books, talking portraits, and a classroom with students practicing magic. The overall image should be vibrant and exciting, capturing the wonders of learning magic at Magic School."
                  },
                  {
                    "chapter_title": "The Magical Challenge",
                    "chapter_text": "One day, the headmaster announced a magical challenge. All the students had to perform a spell to save the magic school from a mischievous goblin who had stolen the school's magic wand. Timmy was nervous, but he remembered all the lessons he had learned. He used his knowledge of magic to create a shield of light and defeat the goblin. He returned the magic wand to the headmaster and saved the school!",
                    "image_prompt": "Paper cut style illustration of Timmy using a spell to create a shield of light against a mischievous goblin who has stolen the school's magic wand. The headmaster watches from a balcony, and other students look on with excitement. The overall image should be dramatic and action-packed, showcasing Timmy's bravery and magical skills."
                  },
                  {
                    "chapter_title": "A Magical Friendship",
                    "chapter_text": "Timmy realized that he wasn't just learning about magic, but also making friends. He and his classmates helped each other, played together, and learned from each other. They learned the true meaning of friendship and the importance of using their magic for good. Timmy knew that his journey at Magic School was just the beginning. He had a lifetime of magic and adventure ahead of him.",
                    "image_prompt": "Paper cut style illustration of Timmy and his classmates, who are now close friends, smiling and playing together in the magical school. They are all dressed in their magic school uniforms and are surrounded by magical elements, like floating books and twinkling stars. The overall image should be warm and heartwarming, showcasing the joy of friendship and the power of magic."
                  }
                ]
              }`,
        },
      ],
    },
  ],
});
