"use client";
import { NextUIProvider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<any>(null);

  // Function to check if user exists and insert if not
  const saveNewUserIfNotExists = async () => {
    try {
      if (!user) return;

      // Check if the user already exists
      const userResp: any = await db
        .select()
        .from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress ?? ""));
      console.log(userResp, "userResp");

      // If user does not exist, insert them into the database
      if (!userResp.length) {
        const result = await db
          .insert(Users)
          .values({
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
            image: user?.imageUrl,
          })
          .returning({
            userEmail: Users.email,
            userName: Users.name,
            userImage: Users.image,
            credits: Users.credits,
          });

        setUserDetails(result[0]); // Set user details for the new user
      } else {
        setUserDetails(userResp[0]); // Set user details for existing user
      }
    } catch (error) {
      console.error("Error saving or fetching user:", error);
    }
  };

  // Use effect to run on user change
  useEffect(() => {
    if (user) {
      saveNewUserIfNotExists();
    }
  }, [user]);

  console.log(userDetails, "userDetails");

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <NextUIProvider>
        {/* Header */}
        <Header />
        {children}
      </NextUIProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
