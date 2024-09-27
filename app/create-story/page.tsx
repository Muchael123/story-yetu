"use client";
import React, { useContext, useEffect, useState } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/GeminiAi";
import uuid4 from "uuid4";
import { db } from "@/config/db";
import { storyData, Users } from "@/config/schema";
import CustomLoader from "./_components/CustomLoader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import "react-toastify/dist/ReactToastify.css";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";

export interface fieldData {
  fieldValue: string;
  fieldName: string;
}
export interface FormDataType {
  storySubject: string;
  Type: string;
  AgeGroup: string;
  ImageStyle: string;
}

function CreateStory() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>();
  const router = useRouter();
  const notify = (message: string) => toast.success(message);
  const errorNotify = (message: string) => toast.error(message);
  const { user } = useUser();
  const {userDetails, setUserDetails} = useContext(UserDetailContext)

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prevData: any) => {
      return {
        ...prevData,
        [data.fieldName]: data.fieldValue,
      };
    });
  };
  
  // generate ai story
  const GenerateStory = async () => {
    console.log("Generate story", formData);
    const coins = userDetails?.credits;

    if (coins < 1) {
      errorNotify("Not enough coins. Please purchase");
      router.push("/add-coins");
      return;
    }

    const Final_Prompt = `write a kid story on description for ${formData?.AgeGroup} years kids, ${formData?.Type} ,and all images on ${formData?.ImageStyle} style: ${formData?.storySubject}. give me 5 chapters. With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in json fields formats`;

    try {
      setLoading(true);

      // Generate story from AI
      const result = await chatSession.sendMessage(Final_Prompt);
      const responseText = await result?.response.text();
      

      // Image generation process
      const story = JSON.parse(responseText);
      console.log("story", story);

      const imageResp = await axios.post("/api/generate-image", {
        prompt: `Design a book cover set in an African environment. Use bold text for the title: "${story?.story_title}". Incorporate elements like African landscapes, traditional patterns, colors inspired by African culture, and any specific details from the prompt: "${story?.cover_image_prompt}".`,
      });

      const AIimage = imageResp.data.imageUrl;
      

      const imageResult = await axios.post("/api/save-image", {
        url: AIimage,
      });
      const firebaseImageUrl = imageResult?.data.imageUrl;

      const resp: any = await SaveInDB(responseText, firebaseImageUrl);

      // Subtract coins and update context
      await subtractCoins(coins - 1); // Ensure coins are updated before continuing

      notify("Story generated successfully!");

      // Redirect to view the new story
      router?.replace(`/view-story/${resp[0]?.storyId}`);
    } catch (e) {
      console.error(e);
      errorNotify("Failed to generate story, please try again");
    } finally {
      setLoading(false);
    }
  };

  const subtractCoins = async (coins: number) => {
    try {
      const res = await db
        .update(Users)
        .set({
          credits: coins,
        })
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress ?? ""))
        .returning({ id: Users.id, credits: Users.credits });

      // Update the context with new user details (new coin balance)
      if (res.length > 0) {
        const updatedUserDetails = {
          ...userDetails,
          credits: coins, // update the credits in the context
        };
        setUserDetails(updatedUserDetails); // update the userDetails context
      }

      return res;
    } catch (error) {
      console.error("Failed to update coins:", error);
      throw error; // propagate the error if needed
    }
  };

  const SaveInDB = async (result: any, imageUrl: string) => {
    const recordID = uuid4();

    try {
      let parsedResult = JSON.parse(result);
      

      const final_result = await db
        .insert(storyData)
        .values({
          storySubject: formData?.storySubject,
          storyType: formData?.Type,
          ageGroup: formData?.AgeGroup,
          imageStyle: formData?.ImageStyle,
          output: parsedResult,
          storyId: recordID,
          coverimage: imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImage: user?.imageUrl,
        })
        .returning({ storyId: storyData?.storyId });
      
      return final_result;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="p-10 md:px-20 px:40">
      <ToastContainer />
      <h2 className="text-primary font-extrabold text-3xl lg:text-[70px] text-center">
        CREATE YOUR STORY
      </h2>
      <p className="lg:text-2xl text-lg text-primary text-center pt-5 md:pt-7 lg:pt-12">
        Unleash Your Imagination with AI: Weave Captivating Stories Like Never
        Before! One story at a time, let's create a world of our own.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 lg:mt-30">
        {/* story subjec */}
        <StorySubjectInput userSelection={onHandleUserSelection} />
        {/* story type */}
        <StoryType userSelection={onHandleUserSelection} />
        {/* age group */}
        <AgeGroup userSelection={onHandleUserSelection} />
        {/* image type */}
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className="flex justify-end my-10">
        <Button
          color="primary"
          className="p-10 text-2xl"
          onClick={GenerateStory}
          disabled={loading}
        >
          Generate Story
        </Button>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
}

export default CreateStory;
