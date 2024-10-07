import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex">
          <Image
            src={"/login.jpeg"}
            alt="hero"
            width={800}
            height={400}
            className="w-full"
          />
        </div>
        <div className="flex justify-center items-center h-screen">
          <SignUp />
        </div>
      </div>
    );
}
