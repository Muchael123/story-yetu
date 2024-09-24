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
  useEffect(() => {
    user && saveNewUserIfNotExists();
  }, [user]);

  const [userDetails, setUserDetails] = useState<any>();

  const saveNewUserIfNotExists = async () => {
    // check if user exists in db
    const userResp: any = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress ?? ""));

    if (!userResp.length[0]) {
      // save user to db
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
      setUserDetails(result[0]);
    }
  };

  // if not, save user to db

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
