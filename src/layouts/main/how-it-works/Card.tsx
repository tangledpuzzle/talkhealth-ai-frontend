import Image from "next/image";
import { FC } from "react";

interface CardProps extends StepCardProps {}

const Card: FC<CardProps> = ({ nbr, content, icon, title }) => {
  return (
    <div className="w-full rounded-xl p-3 bg-white">
      <div className="flex items-center justify-between border-b pb-1 border-b-stone-200">
        <p className="font-bold text-primary-green">Step {nbr}</p>
        <Image
          src={icon}
          alt={title + "image"}
          height={400}
          width={400}
          className="h-10 w-10"
        />
      </div>
      <div className="space-y-2 py-2">
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-sm sm:text-base text-[#2D2D3E]">{content}</p>
      </div>
    </div>
  );
};

export default Card;
