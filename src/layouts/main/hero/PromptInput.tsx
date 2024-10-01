"use client";
import { cn } from "@/lib/utils";
import { FC, InputHTMLAttributes } from "react";
import { Icons } from "../Icons";
import { FaArrowUp } from "react-icons/fa";
import { IconPhotoPlus } from "@tabler/icons-react";

interface PromptInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setIsFirstChat: (isFirst: boolean) => void;
  setFile: (file: File) => void;
}

const PromptInput: FC<PromptInputProps> = ({
  className,
  setFile,
  setIsFirstChat,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex bg-white ring-2 transition-all duration-300 rounded-lg ring-offset-2 has-[:focus]:ring-black items-center",
        className
      )}
    >
      <div className="flex items-center text-stone-500 animate-pulse ml-2 justify-center">
        <Icons.spackle />
      </div>
      <input
        {...props}
        className="bg-transparent w-full h-10 px-3 py-2 flex focus-visible:outline-none focus-visible:border-none border-0 focus-visible:ring-0"
      />
      <div className="border relative border-blue-200 sm:h-8 sm:w-8 mr-2 rounded-full flex justify-center items-center p-1">
        <label htmlFor="imageUpload" title="Upload an image">
          <IconPhotoPlus className={cn("md:h-5 md:w-5 h-4 w-4 cursor-pointer", false && "opacity-60")} />
          <input
            id="imageUpload"
            type="file"
            accept="image/jpeg, image/png"
            // disabled={uploading}
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            className="sr-only"
            // multiple
          />
        </label>
      </div>

      <div
        className="h-6 sm:h-9 cursor-pointer w-6 sm:w-9 mr-1 flex items-center justify-center p-1 rounded-full bg-black hover:bg-stone-900"
        onClick={() => setIsFirstChat(false)}
      >
        <FaArrowUp color="white" />
      </div>
    </div>
  );
};

export default PromptInput;
