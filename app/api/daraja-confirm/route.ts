import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("Daraja confirm request received");
    const data = await req.json();
    try  {
    const { amount, accountReference, transactionDesc } = data;

        console.log("data", data);
        if (data.Body.stkCallback.ResultCode === 0) { 
            console.log("success");
            // Update user credits
            
            // Save transaction
            // Send email
        }
        return NextResponse.json({ message: "success" });
    } catch (error) {
        console.log("errore", error);
        return NextResponse.json({ error: "an error occured" }, { status: 500 });

    }

}