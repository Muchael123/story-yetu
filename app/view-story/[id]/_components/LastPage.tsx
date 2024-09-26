import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import "react-social-icons/meetup";
import { FaXTwitter } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import { FaLink, FaWhatsapp } from 'react-icons/fa';

function LastPage() {
  const router = useRouter();
  const pathname = usePathname();
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
  const title = "Check out this story I just read on Story-Yetu";
  const [showShare, setShowShare] = useState(false);
  const notify = (message:string) => toast.success(message);
  const copy =async () => {
    await navigator.clipboard.writeText(shareUrl);
    notify("Link copied to clipboard");
  }


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
          className="flex justify-center items-center"
        >
          Share Story
        </Button>
      </div>

      {showShare && (
        <div className="grid  grid-cols-3 md:grid-cols-4 gap-5 ">
          <a
            target="_blank"
            href={`https://x.com/intent/post?text=${title}&url=${shareUrl}`}
          >
            <FaXTwitter className="text-gray-900" size={24} />
          </a>
          <a target="_blank" href={`whatsapp://send?text=${title} ${shareUrl}`}>
            <FaWhatsapp className="text-green-400" size={24} />
          </a>
          <div onClick={() => copy()} className='cursor-pointer'>
            <FaLink className="text-gray-400" size={24} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LastPage