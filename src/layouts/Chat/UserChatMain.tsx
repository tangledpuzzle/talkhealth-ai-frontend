import { cn } from "@/lib/utils";
import { IconPdf } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function UserChat(
  {
    message,
    queryImage,
    selectedPdf,
  }: {
    message?: string;
    queryImage: string | null;
    selectedPdf?: string | null;
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [fullName, setFullName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fullName = localStorage.getItem("fullName") as string;
    const image = localStorage.getItem("image")
      ? (localStorage.getItem("image") as string)
      : "";
    if (fullName) {
      setFullName(fullName);
    }
    if (image) {
      setImage(image);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="flex w-full gap-x-5 group mb-8 items-end justify-end"
    >
      <div className="bg-gpt-green-dark/5 px-3 max-w-[90%] w-auto ml-5 py-2 max-md:py-0.5 rounded-xl">
        <p className="font-alpina text-sm sm:text-base md:text-lg   ml-auto  rounded-md text-left">
          <span className={`break-words ${queryImage && "pt-2"}`}>
            {message}
          </span>
        </p>

        <div className="flex pt-2 max-md:pt-1 gap-3 w-full justify-end items-center">
          {/* {queryImage && queryImage?.length > 0 &&
            // @ts-ignore
            queryImage?.map((image, index) => (
             <>
             {
              image && ( <Image
                key={index}
                src={image}
                alt="User"
                className="self-end h-20 w-20   rounded-tl-md rounded-tr-md rounded-bl-md"
                // style={{
                //   height: "auto",
                // }}
              />)
             }
             </>
            ))} */}

          {queryImage && (
            <img
              src={queryImage}
              alt="User"
              className="self-end h-20 w-20 rounded-tl-md rounded-tr-md rounded-bl-md"
            />
          )}
          {selectedPdf && (
        <>
          <div className="self-end w-fit max-w-xs flex justify-start items-start gap-2 bg-white rounded-l-md overflow-hidden rounded-tr-md">
            <div className="p-2 bg-red-600 shrink-0 h-full flex justify-center items-center">
              <IconPdf className="w-8 h-8 text-white shrink-0" />
            </div>

            <div className="pr-3 flex flex-col justify-start truncate overflow-hidden items-start">
              <p className="font-oracle">
                {selectedPdf.split("/").pop()?.slice(13)}
              </p>

            </div>
            <div className="bg-white h-full flex-grow bg-gradient-to-l from-white via-white to-white/40"></div>
          </div>
        </>
      )}
        </div>
      </div>
      

      {/* <div className="bg-green-400 w-10 h-10 max-md:w-8 max-md:h-8 max-md:text-base text-xl rounded-full flex justify-center items-center font-semibold text-black/50">
        D
      </div> */}

      { /*  User Avatar  */}
      
      <div className="w-12 h-12">
        <span
          className={cn(
            "bg-black/80 w-12 h-12 gap-4 justify-center items-center text-xl text-white rounded-full ",
            image ? "hidden" : "flex"
          )}
        >
          {fullName?.charAt(0).toUpperCase() || "U"}
        </span>
        <img
          src={image || "/user.png"}
          alt="user"
          className={cn(
            "w-12 h-12 max-md:w-10 max-md:h-10 rounded-full items-center object-cover max-w-[fit-content]",
            image ? "flex" : "hidden"
          )}
        />
      </div>
    </div>
  );
}

// export forward ref
export default React.forwardRef(UserChat);
