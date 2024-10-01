"use client";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  content: string;
  image: string;
  isNew?: boolean;
}

const Card: FC<CardProps> = ({ content, image, isNew }) => {
  return (
    <div
    className="w-full h-full px-5">
        {/* <Link
    href="/blog/ab"
    className="w-full h-full flex"
    > */}
         <div className="w-full h-full p-2 text-black bg-transparent rounded-3xl bg-white  flex flex-col items-stretch">
        <div className="w-full rounded-3xl transition-all duration-300 h-44 overflow-clip">
        <Link href="/blog/a">
          <Image
            src={image}
            alt="blog"
            height={400}
            width={400}
            className="w-full h-full object-cover rounded-3xl"
          />
        </Link>
        </div>
       <Link href="/blog/a">
       <p className="my-3 lg:font-bold px-4 lg:px-10 text-center text-sm">
          {content}
        </p>
       </Link>
      </div>
        {/* </Link> */}
     
    </div>
  );
};

export default Card;
