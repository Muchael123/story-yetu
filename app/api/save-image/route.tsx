import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) { 
     const convertImage = async (url: string) => {
       try {
         const response = await axios.get(url, { responseType: "arraybuffer" });
         const base64Image = Buffer.from(response.data).toString("base64");
         return base64Image;
       } catch (e) {
         console.log("error converting base64 image", e);
       }
     };
    const data = await req.json();
    const { url } = data;
    const myimg = await convertImage(url)
    const base64Image = "data:image/png;base64," + myimg;

    const FileName = '/ai-story/' + Date.now() + '.png'
    const ImageRef = ref(storage, FileName);
    await uploadString(ImageRef, base64Image,'data_url').then((snapshot) => {
        console.log('file uploaded')
    });

    const downloadUrl = await getDownloadURL(ImageRef)
    console.log(downloadUrl)
    return NextResponse.json({imageUrl: downloadUrl})
}

