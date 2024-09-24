import { db } from "@/config/db";
import { Transactions } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Daraja confirm request received");
    const data = await req.json();

    const RemoveTransactionFromDB = async (CheckoutRequestID: string) => {
        console.log("removing transaction from db", CheckoutRequestID);
        try {
            const res = await db
        .delete(Transactions)
        .where(eq(Transactions.CheckoutRequestID, CheckoutRequestID))
        .returning({ CheckoutRequestID: Transactions.CheckoutRequestID });
      console.log("res", res);
        } catch (error) {
            console.log("error", error);
            return "An error occured"
        }

      
    };

    try  {
    const { amount, accountReference, transactionDesc } = data;

        console.log("data", data);
        if (data.Body.stkCallback.ResultCode === 0) { 
            console.log("success");
            // Update user credits
            
            // Save transaction
            // Send email
        }
        else {
            const remove = await RemoveTransactionFromDB(data.Body.stkCallback.CheckoutRequestID);
            console.log("remove", remove);
        }
        return NextResponse.json({ message: "success" });
    } catch (error) {
        console.log("errore", error);
        return NextResponse.json({ error: "an error occured" }, { status: 500 });

    }

    

}