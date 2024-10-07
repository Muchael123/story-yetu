export const generatePassword = () => {
  const shortcode = process.env.DARAJA_SHORTCODE;
  const passkey = process.env.DARAJA_PASSKEY;
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
};
