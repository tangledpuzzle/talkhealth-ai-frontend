"use client";
import { generateArray } from "@/lib/utils";
import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CardProps {
  nbr: number;
  content: string;
  person: {
    name: string;
    role: string;
    image: string;
  };
}

const getUserAvatarFallback = (name: string): string => {
  const names = name.split(" ");
  return names.length > 1 ? names[0][0] + names[1][0] : name.slice(0, 2);
};

const Card: FC<CardProps> = ({
  nbr,
  content,
  person: { name, role, image },
}) => {
  return (
    <div className="w-full max-w-[32rem] px-2">
      <div className="rounded-xl p-3 xs:p-5 bg-brand-main/[0.05] lg:min-h-[254px] min-h-[278px]">
        <div className="flex items-center gap-4 border-b-2 py-3 sm:py-5 border-b-stone-300">
          <p className="font-bold text-primary-violet text-lg">{nbr}.0</p>
          <div className="flex items-center gap-2">
            {generateArray(nbr, "#FDC448", "#D2EBF3").map((color, i) => (
              <FaStar fill={color} key={i} className="text-sm" />
            ))}
          </div>
        </div>
        <div className="space-y-2 py-2 text-[#2D2D3E]">
          <p className="text-xs min-h-20 xs:text-sm sm:text-base">{content}</p>
          <div className="flex gap-3">
            <Avatar className="h-8 sm:h-12 w-8 sm:w-12">
              <AvatarImage src={image} alt="image" />
              <AvatarFallback className="uppercase">
                {getUserAvatarFallback(name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-base font-bold">{name}</h1>
              <p className="text-sm sm:text-base">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
