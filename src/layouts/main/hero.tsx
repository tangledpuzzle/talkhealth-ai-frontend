import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import PromptInput from "./hero/PromptInput";
import FreeChat from "@/layouts/Chat/FreeChatMain";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";

const Hero = () => {
  const [free, setFree] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ipadd, setIpadd] = useState<string | undefined>("");
  const [firstText, setFirstText] = useState<string | undefined>("");
  const [file, setFiles] = useState<File | null>(null);
  const [showImage, setShowImages] = useState<string[]>([]);
  const [fileListInitial, setFileListInitial] = useState<File[]>([]);
  const [isFirstChat, setIsFirstChat] = useState(true);
  useEffect(() => {
    // Function to fetch IP Address
    const fetchIP = async () => {
      try {
        // Making a request to the service
        const response = await fetch(
          "https://www.cloudflare.com/cdn-cgi/trace"
        );
        const data = await response.text();

        // Parsing the response to get the IP Address
        const ip = data
          .split("\n")
          .find((line) => line.startsWith("ip="))
          ?.split("=")[1];
        const result = await fetch(`/api/Ips/${ip}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const resultnum = await result.json();
        setFree(0);
        setIpadd(ip);
        localStorage.setItem('threadId', ip || "free");
      } catch (error) {
      }
    };
    fetchIP();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (window.innerWidth < 768) {
        setIsFirstChat(false);
      }
    }, 3000);
  }, []);

  async function setFile(file: File) {
    if (file) {
      setFiles(file);
      setFileListInitial([...fileListInitial, file]);
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadFileToS3(buffer, file.name);
      if (fileName) {
        setShowImages([
          ...showImage,
          "https://pdfimageupload.s3.amazonaws.com/" + fileName,
        ]);
        setIsFirstChat(false);
        setFiles(null);
      }
    }
  }

  return (
    <div id="hero" className={
      cn("w-full xxl:h-[112vh] h-full relative gap-4 min-w-[10rem] max-w-[100rem] 2xl:max-w-full max-xxl:h-[1072px] max-sm:h-full",
        isFirstChat && "max-sm:h-[92vh]")
    }>
      <div className="relative w-full px-5 max-sm:mt-0 sm:px-6 max-2xl:flex max-2xl:flex-col  items-center justify-center 2xl:min-h-full max-md:min-h-full md:min-h-[720px] z-10 pb-10">
        {!isFirstChat ? (
          <div className="w-full h-full max-sm:h-[760px] flex justify-center items-center pt-8 max-sm:pt-0">
            <FreeChat
              ipadd={ipadd}
              free={free}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              firstText={firstText}
              initialImages={showImage}
              fileListInitial={fileListInitial}
            />
          </div>
        ) : (
          <div className="w-full h-full md:min-h-[730px] flex justify-center items-center">
            <div className=" w-fit h-full md:px-5 px-1 xl:px-0">
              <h1 className="text-2xl xs:text-3xl sm:text-6xl 2xl:text-7xl font-bold text-center text-brand-black">
                Get your medical answers now
              </h1>
              <div className="w-full  pt-3">
                <PromptInput
                  placeholder="Start entering your symptom or health question..."
                  type="text"
                  className="w-full text-sm sm:text-base rounded-full mt-10 "
                  onChange={(e) => {
                    setFirstText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsFirstChat(false);
                    }
                  }}
                  setIsFirstChat={setIsFirstChat}
                  value={firstText}
                  setFile={setFile}
                />
              </div>
              <div className="grid  justify-center 2xl:grid-cols-4 md:grid-cols-2  2xl:w-[90%] md:w-[70%] lg:w-[60%] mx-auto  gap-4 pt-4 mt-5">
                {[
                  "What's this symptom mean?",
                  "Can you explain my lab results?",
                  "Should I worry about this pain?",
                  "What do these test numbers indicate?",
                ].map((e, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setFirstText(e);
                      setIsFirstChat(false);
                    }}
                    className={cn(
                      "border-2 w-max px-4 py-1 border-black rounded-full font-semibold text-xs sm:text-sm  hover:bg-gpt-green-light duration-300 transition-colors cursor-pointer"
                    )}
                  >
                    {e}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
        <div
          className={`w-full max-xl:top-11 absolute max-2xl:relative md:bottom-5 xl:-bottom-11 2xl:bottom-2  md:right-6 sm:w-72 mb-10 max-md:hidden ${isExpanded ? "hidden" : ""
            } bg-white rounded-3xl p-2 self-end ${isFirstChat ? "md:right-2 md:bottom-3" : ""
            }`}
        >
          <div className="relative">
            <div className="absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 bg-white rounded-full flex items-center justify-center h-10 w-10">
              <FaPlay color="50B887" size={10} />
            </div>
            <Image src={"/user.png"} alt="user" height={600} width={700} />
          </div>
          <h1 className="my-3 font-bold px-10 text-center">
            Watch the video to see how it works!
          </h1>
        </div>
      </div>
      <div className="absolute z-0 bottom-0 left-0">
        <Image
          src={"/bg-accent.webp"}
          height={900}
          width={900}
          alt="bg-accent"
          className="h-72 sm:h-[60vh] w-screen sm:w-[80vw]"
        />
      </div>
    </div>
  );
};

export default Hero;
