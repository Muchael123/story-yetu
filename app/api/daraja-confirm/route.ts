import { db } from "@/config/db";
import { Transactions, Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Daraja confirm request received");
  const data = await req.json();

  // Function to remove the transaction from the database
  const RemoveTransactionFromDB = async (CheckoutRequestID: string) => {
    console.log("Removing transaction from db", CheckoutRequestID);
    try {
      const res = await db
        .delete(Transactions)
        .where(eq(Transactions.CheckoutRequestID, CheckoutRequestID))
        .returning({ CheckoutRequestID: Transactions.CheckoutRequestID });
      console.log("res", res);
      return res;
    } catch (error) {
      console.log("Error while deleting transaction", error);
      return null;
    }
  };

  // Function to update the transaction in the database
  const updateTransaction = async (data: any) => {
    try {
      const { amount, accountReference, transactionDesc } = data;
      const res = await db
        .update(Transactions)
        .set({
          Accepted: 1,
          MpesaCode: data.Body.stkCallback.CallbackMetadata.Item[1].Value, // Ensure this path is correct
        })
        .where(
          eq(
            Transactions.CheckoutRequestID,
            data.Body.stkCallback.CheckoutRequestID
          )
        )
        .returning({
          CheckoutRequestID: Transactions.CheckoutRequestID,
          userEmail: Transactions.userEmail, // Assuming this is the user's email field in Transactions
          credits: Transactions.credits,
        });
      console.log("Transaction updated:", res);
      return res[0]; // Return the updated transaction
    } catch (error) {
      console.log("Error while updating transaction", error);
      return null;
    }
  };

  // Function to fetch user details from the database
  const getUser = async (email: string) => {
    try {
      const res = await db.select().from(Users).where(eq(Users.email, email));
      console.log("Fetched user:", res);
      return res[0];
    } catch (error) {
      console.log("Error fetching user", error);
      return null;
    }
  };

  // Function to update user credits
  const updateUserCredits = async (user: any, creditsToAdd: number) => {
    try {
      const res = await db
        .update(Users)
        .set({
          credits: user.credits + creditsToAdd, // Adding new credits
        })
        .where(eq(Users.email, user.email))
        .returning({ email: Users.email, credits: Users.credits });
      console.log("Updated user credits:", res);
      return res[0];
    } catch (error) {
      console.log("Error updating user credits", error);
      return null;
    }
  };

  try {
    // Handle the Daraja callback
    if (data.Body.stkCallback.ResultCode === 0) {
      console.log("Transaction successful");

      // 1. Update the transaction to mark it as accepted
      const transactionUpdate = await updateTransaction(data);

      if (!transactionUpdate) {
        throw new Error("Failed to update transaction");
      }

      // 2. Get the user from the database
      const user = await getUser(transactionUpdate.userEmail??'');
      if (!user) {
        throw new Error("Failed to fetch user");
      }

      // 3. Update the user's credits
      const updatedCredits = await updateUserCredits(
        user,
        transactionUpdate.credits??0
      );
      if (!updatedCredits) {
        throw new Error("Failed to update user credits");
      }

      console.log("User credits successfully updated", updatedCredits);
    } else {
      // Transaction failed, remove from DB
      console.log("Transaction failed, removing...");
      const removeTransaction = await RemoveTransactionFromDB(
        data.Body.stkCallback.CheckoutRequestID
      );
      if (!removeTransaction) {
        throw new Error("Failed to remove transaction");
      }
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
