import axios from "axios";

export const getAccessToken = async () => {
  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      auth: {
        username: process.env.DARAJA_CONSUMER_KEY ?? "",
        password: process.env.DARAJA_CONSUMER_SECRET ?? "",
      },
    }
  );
  return response.data.access_token;
};
