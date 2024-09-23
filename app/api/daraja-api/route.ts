import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let headers = new Headers();

  const generateTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };
  const consumerKey: string = process.env.DARAJA_CONSUMER_KEY ?? "";
  const consumerSecret: string = process.env.DARAJA_CONSUMER_SECRET ?? "";

  const generateAccessToken = async (
    consumerKey: string,
    consumerSecret: string
  ) => {
    try {
      const response = await axios.get(
        "https://api.safaricom.co.ke/oauth/v1/generate",
        {
          auth: {
            username: consumerKey,
            password: consumerSecret,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      throw error;
    }
  };

  headers.append("Content-Type", "application/json");

  headers.append(
    "Authorization",
    `Bearer ${generateAccessToken(consumerKey, consumerSecret)}`
  );

  fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",

    headers,

    body: JSON.stringify({
      BusinessShortCode: 174379,

      

      Timestamp: generateTimestamp(),

        TransactionType: "CustomerPayBillOnline",
      Password: Buffer.from(`${174379}${process.env.DARAJA_PASSKEY}${generateTimestamp()}`).toString("base64"),

      Amount: 1,

      PartyA: 254708374149,

      PartyB: 174379,

      PhoneNumber: 254114400824,

      CallBackURL: "https://mydomain.com/path",

      AccountReference: "CompanyXLTD",

      TransactionDesc: "Payment of X",
    }),
  })
    .then((response) => response.text())

    .then((result) => console.log(result))

    .catch((error) => console.log(error));
}