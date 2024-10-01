import { IconUpload } from "@tabler/icons-react";
import { Check, FileImage, Laptop2, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders a component for pre-chat file upload.
 *
 * @param {Object} setFile - A function that sets the selected file.
 * @return {JSX.Element} The rendered pre-chat file upload component.
 */
export default function PreChatMain({
  setFile,
  setStartChat,
}: {
  setFile: (file: File) => void;
  setStartChat: (startChat: boolean) => void;
}) {
  const [fileUpload, setFileUpload] = useState(false);
  const [fileUploadStates, setFileUploadStates] = useState<string>("UPLOAD");

  return (
    <div
      className=""
    >
      <div className="w-full h-full max-sm:h-fit flex max-md:flex-col flex-row justify-between items-start gap-12 max-md:gap-6">
        {/* For desktop */}
        <div
          className="w-1/2 max-md:w-full bg-white rounded-3xl flex border-2 max-md:border border-dashed border-[#AEAEAE] xxl:h-[570px] md:h-[480px]  max-md:h-56"
          data-aos="fade-right"
        >
          <label
            htmlFor="fileUpload"
            className="cursor-pointer md:flex flex-col  justify-center p-8 max-md:p-0 items-center mx-auto  "
          >
            <div className="flex gap-2 max-md:flex-col w-full">
              <div className="flex flex-col w-full">
                <article className="grow max-md:my-5">
                  <div className="flex gap-5 max-md:gap-3 items-center  flex-col">
                    <aside className="flex justify-center w-full">
                      {fileUploadStates === "UPLOAD" ? (
                        <>
                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 151 151"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M76.125 59.875L90.75 74.5H82.875V92.5H69.375V74.5H61.5L76.125 59.875Z"
                              fill="#21AFDC"
                            />
                            <circle
                              cx="75.5"
                              cy="75.5"
                              r="48.5"
                              stroke="#E7E7E7"
                              strokeWidth="3"
                            />
                            <circle
                              cx="75.5"
                              cy="75.5"
                              r="74.5"
                              stroke="#E4E4E4"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <div>
                            <RadialProgressBar />
                          </div>
                        </>
                      )}
                      {/* </>
                      )} */}
                    </aside>
                    <div className="flex flex-col ml-1 max-md:mb-5  max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col self-stretch my-auto max-md:mt-4 max-md:items-center">
                        <h2 className="text-xl font-bold max-md:text-lg max-md:font-medium  text-gray-800 whitespace-nowrap">
                          Drop your test results here
                        </h2>
                        <p className="mt-4 text-sm font-semibold  max-md:font-medium  inline-flex items-center">
                          or{" "}
                          <span className="text-sky-500 hidden  underline md:inline-flex items-center">
                            {" "}
                            <Laptop2 size={14} className="mx-2" />
                            Browse from computer
                          </span>
                          <span className="text-sky-500 underline max-md:inline-flex hidden items-center">
                            {" "}
                            {/* <Smartphone /> */}
                            <Smartphone size={14} className="mx-0.5" />
                            Choose file
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </label>
        </div>

        <div className="w-1/2 max-md:w-full" data-aos="fade-left">
          <StartChat setStartChat={setStartChat} />
        </div>

        <input
          onChange={(e) => {
            if (e.target.files) {
              // setFile(e.target.files[0]);
              // setFileUpload(true);
              setFileUploadStates("UPLOADED");

              setTimeout(() => {
                // @ts-ignore
                setFile(e.target.files[0]);
                setFileUpload(true);
              }, 600);
            }
          }}
          id="fileUpload"
          type="file"
          className="sr-only"
        />
      </div>
    </div>
  );
}

const StartChat = ({
  setStartChat,
}: {
  setStartChat: (startChat: boolean) => void;
}) => {
  return (
    <>
      <div className="flex overflow-hidden relative flex-col w-full xxl:min-h-[570px] md:min-h-[480px] max-md:min-h-[220px] max-md:max-w-full">
        <img
          src="/doct.png"
          alt="doctor "
          className="object-cover absolute inset-0 w-full h-full rounded-xl"
        />
        <div className="flex absolute bottom-9 max-md:bottom-2 right-8 left-8 flex-col w-fit p-5 max-md:p-4  bg-white rounded-2xl  max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 justify-between max-md:flex-wrap max-md:gap-2.5">
            <div className="flex-auto text-xl max-md:text-center font-semibold max-md:text-lg max-md:font-medium leading-8 text-gray-800">
              Start asking your medical questions!
            </div>
            <div
              className="grow justify-center px-6 max-md:px-5 max-md:py-3 py-4 my-auto text-base max-md:text-sm max-md:text-center cursor-pointer font-medium text-white whitespace-nowrap bg-sky-500 rounded-[40px] "
              onClick={() => setStartChat(true)}
            >
              Start a chat
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RadialProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 20;
        return newProgress >= 100 ? 100 : newProgress; // Stop when progress reaches 100
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative max-md:w-24 max-md:h-24 w-36 h-36 ">
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 24 24">
          {/* Background Circle */}
          <circle
            className="stroke-current text-gray-200"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="1"
          />
          {/* Progress Circle */}
          <circle
            className="stroke-current text-sky-500"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="1"
            style={{
              strokeDasharray: "63px",
              strokeDashoffset: `${63 - (progress / 100) * 63}px`,
              transition: "stroke-dashoffset 0.3s ease-in-out",
              transformOrigin: "50% 50%",
              transform: "rotate(-90deg)",
            }}
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {/* <FileImage className="text-sky-500" size={32} /> */}
        {/* <Check className="text-sky-500 animate-bounce mt-4" size={48} strokeWidth="2" /> */}
        {
          progress === 100 ? <Check className="text-sky-500 animate-bounce mt-4" size={48} strokeWidth="2" /> : <FileImage className="text-sky-500" size={36} />
        }
      </div>
    </div>
  );
};
