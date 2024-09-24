import { generatePassword } from "@/functions/generatePassword";
import { getAccessToken } from "@/functions/getAccessToken";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  
  try {
    const { phoneNumber, amount } = await req.json();
    const accessToken = await getAccessToken();

    // STK Push request
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);
    const password = generatePassword();

    const stkPush = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.DARAJA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.DARAJA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.DARAJA_CALLBACK_URL, // This is a placeholder
        AccountReference: "Story-Yetu",
        TransactionDesc: "subscription",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(stkPush.data);
    if(stkPush.data.ResponseCode === "0") {
      return NextResponse.json({
        success: true,
        ResponseDescription: stkPush.data.ResponseDescription,
        CheckoutRequestID: stkPush.data.CheckoutRequestID,
        phoneNumber: phoneNumber,
        amount: amount,
      });
    }else {
      return NextResponse.json({ success: false, ResponseDescription: stkPush.data.ResponseDescription });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occured" }, { status: 500 });
    
  }

  // Function to generate password for STK push

}
