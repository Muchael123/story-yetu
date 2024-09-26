import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  XIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinIcon,
  FacebookIcon,
  EmailIcon,
} from "react-share";
import { usePathname } from "next/navigation";

function LastPage() {
  const router = useRouter();
  const pathname = usePathname();
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
  const title = "Check out this story I just read on Story-Yetu";
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="bg-primary p-10 h-full flex justify-center items-center flex-col gap-3">
      <h2 className="text-center text-2xl text-white">The End...</h2>
      <p className="text-center text-white text-xs">By wabunifu labs</p>
      <div className="flex flex-col w-full md:w-[50%] gap-4">
        <Button
          className="flex justify-center items-center"
          onClick={() => router.push("/explore")}
        >
          See Other stories
        </Button>
        <Button
          className="flex justify-center items-center"
          onClick={() => router.push("/create-story")}
        >
          Create New Story
        </Button>
        <Button
          onClick={() => setShowShare(!showShare)}
          className="flex justify-center items-center">
          Share Story
        </Button>
      </div>
      {showShare && (
        <div className="grid  grid-cols-3 md:grid-cols-4 gap-5 ">
          <EmailShareButton url={shareUrl} subject={title}>
            <EmailIcon size={40} round />
          </EmailShareButton>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <TelegramShareButton url={shareUrl}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <XIcon size={40} round />
          </TwitterShareButton>
          <WhatsappShareButton  url={shareUrl} title={title}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
}

export default LastPage