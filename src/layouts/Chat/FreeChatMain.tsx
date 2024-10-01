import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useScrollIntoView } from "@mantine/hooks";
import { useChatContext } from "@/context/Chat.context";
import AIChat from "@/layouts/Chat/AIChatMain";
import UserChat from "@/layouts/Chat/UserChatMain";
import ChatInput from "@/layouts/Chat/ChatInputMain";
import SuggestionButton from "@/layouts/Chat/SuggestionButton";
import DocumentDropzone from "@/components/others/DocumentDropzone";
import { freepostMessage } from "@/utils/api";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";
import useModalStore from "@/lib/store";

import PreChat from "./PreChat";
import { cn } from "@/lib/utils";
/**
 * A description of the entire function.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - The form event.
 * @return {Promise<void>} Promise that resolves when the form is submitted.
 */

const processData = (data: any[]) =>
  data.length < 2 ? data : data?.slice(0, -2);

export default function FreeChatMain({
  ipadd,
  free,
  isExpanded,
  setIsExpanded,
  firstText,
  initialImages,
  fileListInitial
}: {
  ipadd: string | undefined;
  free: number;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  firstText?: string;
  initialImages?: string[];
  fileListInitial?: File[];
}) {
  const [query, setQuery] = useState("");
  const [queryImage, setQueryImage] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [showImage, setShowImages] = useState<string[]>(initialImages || []);
  const [filesList, setFileList] = useState<File[]>(fileListInitial || []);
  const [filetype, setFileType] = useState<string>('image');
  const [linkUrl, setLinkUrl] = useState<string[]>([]);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);
  const [hideSuggestions, setHideSuggestions] = useState<boolean>(false);
  const date = new Date();
  const hour = date.getHours();
  const [querynum, setQueryNum] = useState(free);
  const hasCalledRef = useRef(false);
  const { toggleLogin, toggleSignup2, toggleNavmodal } = useModalStore();
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({
    offset: -60,
  });

  const {
    state: { data, isAiTyping, messageLoading, prompts: suggestions },
    dispatch,
  } = useChatContext();

  useEffect(() => {
    if (queryImage || selectedPdf) {
      setHideSuggestions(true);
    } else {
      setHideSuggestions(false);
    }
  }, [queryImage, selectedPdf]);

  /**
   * Emits a message, end, prompts, or start event.
   *
   * @param {string} type - The type of event to emit ("MESSAGE", "END", "PROMPTS", or "START").
   * @param {string} text - The text to emit.
   */
  const emit = (
    type: "MESSAGE" | "END" | "PROMPTS" | "START",
    text: string,
    threadId: string
  ) => {
    if (type === "END") {
      dispatch({
        type: "STOP_AI_TYPING",
        threadId: threadId
      });
      setHideSuggestions(false);
    } else if (type === "START") {
      setHideSuggestions(true);
      dispatch({
        type: "START_AI_TYPING",
        threadId: threadId
      });
      scrollIntoView({
        alignment: "start",
      });
    } else if (type === "PROMPTS") {
      dispatch({
        type: "ADD_PROMPTS",
        payload: {
          type: "prompts",
          message: text,
        },
        threadId: threadId
      });
    } else {
      dispatch({
        type: "ADD_AI_MESSAGE",
        payload: {
          type: "ai",
          message: text,
        },
        threadId: threadId
      });
    }
  };

  async function setFile(file: File) {
    if (file) {
      setUploading(true);
      if (file.type === "application/pdf") {
        setFileType('pdf');
      }
      // setFileList([...filesList, file]);
      // in the multiple case
      setFileList([file]);
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadFileToS3(buffer, file.name);
      if (fileName) {
        setUploading(false);
        // setShowImages([...showImage, "https://pdfimageupload.s3.amazonaws.com/" + fileName]);
        setShowImages(["https://pdfimageupload.s3.amazonaws.com/" + fileName]);
      }
    }
  }

  /**
   * Submits the form and performs the necessary actions.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @return {Promise<void>} Promise that resolves when the form is submitted.
   */


  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log("filesList ",filesList);
    //  if(showImage.length > 0){
    //   setIsImageSelected(true);
    //   await getUrls()
    //   // setLinkUrl(["https://pdfimageupload.s3.amazonaws.com/"+filesList[0].name])
    //  }
    //  console.log("linkUrl ",linkUrl);
    setIsImageSelected(true);
    let imageUrl = "";
    let type = "";
    if (filesList.length > 0) {
      imageUrl = "https://pdfimageupload.s3.amazonaws.com/" + hour.toString() + filesList[0].name;
      type = filetype;
    }
    if (querynum < 5) {
      dispatch({
        type: "ADD_USER_MESSAGE",
        payload: {
          type: "user",
          image: type === "image" ? imageUrl : "",
          file: type === "pdf" ? imageUrl : "",
          message: query,
        },
        threadId: ipadd
      });

      freepostMessage(query, imageUrl, emit, type, ipadd);
      setQueryNum(querynum + 1);
      setQuery("");
      setLinkUrl([]);
      setShowImages([]);
      setFileList([]);
      setQueryImage([]);
      setSelectedPdf(null);
    } else {
      toggleLogin(true);
    }
  }

  async function enterEvent() {
    submitForm(event as any);
  }

  /**
   * Sets the file for processing.
   *
   * @param {File} file - The file to be set.
   */
  // async function setFile(file: File) {
  //   if (file.type.includes("image")) {
  //     setUploading(true);
  //     const imageUrl = URL.createObjectURL(file);
  //     // setQueryImage(imageUrl);
  //     setSelectedPdf(null);
  //     const buffer = Buffer.from(await file.arrayBuffer());
  //     const fileName = await uploadFileToS3(buffer, file.name);
  //     // setQueryImage("https://pdfimageupload.s3.amazonaws.com/" + fileName);
  //     setUploading(false);
  //   } else if (file.type.includes("pdf")) {
  //     setUploading(true);
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedPdf(imageUrl);
  //     setQueryImage([]);
  //     const buffer = Buffer.from(await file.arrayBuffer());
  //     const fileName = await uploadFileToS3(buffer, file.name);
  //     setSelectedPdf("https://pdfimageupload.s3.amazonaws.com/" + fileName);
  //     setUploading(false);
  //   }
  // }
  /**
   * Handles the click event on a suggestion.
   *
   * @param {string} suggestion - The clicked suggestion.
   * @return {void} This function does not return anything.
   */
  async function handleSuggestionClicked(suggestion: string) {
    let imageUrl = "";
    if (filesList.length > 0) {
      imageUrl = "https://pdfimageupload.s3.amazonaws.com/" + hour.toString() + filesList[0].name;
    }
    if (querynum < 5) {
      if (isAiTyping) return;
      let threadId = localStorage.getItem('threadId');
      dispatch({
        type: "ADD_USER_MESSAGE",
        payload: {
          type: "user",
          image: "",
          file: "",
          message: suggestion,
        },
        threadId: threadId
      });
      freepostMessage(suggestion, "", emit, "", ipadd);
      setQueryNum(querynum + 1);
      setSelectedPdf(null);
      // setQueryImage([]);
      setQuery("");
    } else {
      toggleSignup2(true);
    }
  }

  useEffect(() => {
    if (firstText && !hasCalledRef.current) {
      handleSuggestionClicked(firstText);
      hasCalledRef.current = true; // Set the ref to true after calling
    }
  }, [firstText]);

  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(false);
    }
      , 1000);
  }, []);

  return (
    <div
      className={cn(
        "flex justify-center self-center flex-col",
        isExpanded
          ? "w-full py-8 px-0 max-sm:p-0"
          : "max-w-[1200px] w-[1140px] p-8 max-sm:p-0",
        " gap-4   transition-all duration-500 ease-linear",
        isMounted ? "h-[150px] md:h-[660px]" : "max-h-[760px] md:max-h-[660px] h-full md:h-[660px]"
      )}
    >
      <div className="h-full w-full max-sm:pt-4 flex flex-col justify-between relative bg-gpt-subtle outline outline-1 outline-gpt-outline max-md:rounded-[30px] rounded-[40px] border-0 max-md:mt-11">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="max-md:hidden flex justify-end pr-4 pt-4"
        >
          {isExpanded ? <LuMinimize2 /> : <LuMaximize2 />}
        </button>
        <div
          ref={scrollableRef}
          className={cn("overflow-y-auto items-center overflow-x-hidden pb-44 max-md:pb-5 flex flex-col relative",
            isMounted ? "hidden" : "")}
        >
          {/* <div className="h-24 shrink-0 w-full bg-gradient-to-b z-10 from-gpt-subtle via-gpt-subtle/90 to-gpt-subtle/0 sticky top-0"></div> */}
          <div className="relative h-full space-y-6 px-5 max-sm:px-2 text-primary-700 w-full mx-auto">
            <div className="w-full flex-grow flex flex-col gap-y-5 md:gap-y-10">
              {processData(data).map((item: any, index: any) => (
                <div className="flex flex-col gap-5" key={index}>
                  {item.type === "user" ? (
                    <UserChat
                      message={item.message}
                      queryImage={item.image}
                      selectedPdf={item.file}
                    />
                  ) : (
                    <AIChat
                      loading={messageLoading && data.length - 1 === index}
                      message={item.message}
                      handleSuggestionClicked={handleSuggestionClicked}
                      animate={data.length - 1 === index}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* chat input */}

            {data.length < 2 ? (
              <></>
            ) : (
              <div className="w-full flex-grow flex flex-col pb-6 lg:pb-8 min-h-[calc(100%-100px)] sm:min-h-[calc(100%+80px)]">
                {data.slice(-2).map((item, index) => (
                  <div className="flex flex-col gap-5" key={index}>
                    {item.type === "user" ? (
                      <UserChat
                        message={item.message}
                        queryImage={item.image}
                        selectedPdf={item.file}
                      />
                    ) : (
                      <AIChat
                        loading={
                          messageLoading && data.slice(-2).length - 1 === index
                        }
                        message={item.message}
                        handleSuggestionClicked={handleSuggestionClicked}
                        animate={data.slice(-2).length - 1 === index}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <div ref={targetRef} id="scrollItem" className={cn("w-full",
              // isMounted ? "hidden": "block"
            )}
            />

            {/* empty chat */}

            {data.length < 2 && <PreChat setFile={setFile} />}


          </div>
        </div>

        <div className=" w-full flex flex-col justify-between gap-2 md:gap-4 bottom-0 mt-auto mx-auto md:right-auto md:left-auto right-0 left-0 px-2 py-4 z-10">
          <form onSubmit={submitForm}
            className="w-full bg-gpt-subtle ">
            <ChatInput
              enterEvent={enterEvent}
              isAiTyping={isAiTyping}
              setQuery={setQuery}
              query={query}
              setQueryImage={setQueryImage}
              queryImage={queryImage}
              selectedPdf={selectedPdf}
              setSelectedPdf={setSelectedPdf}
              uploading={uploading}
              setUploading={setUploading}
              show={data.length === 3 && !isImageSelected}
              setFileList={setFileList}
              filesList={filesList}
              setFile={setFile}
              showImage={showImage}
              setShowImages={setShowImages}
            />
          </form>
        </div>
      </div>
      <div className="grid max-md:mb-1 justify-center 2xl:grid-cols-4 md:grid-cols-2  xl:w-full md:w-full lg:w-[60%] mx-auto  gap-2.5">
        {suggestions.map((suggestion, i) => (

          <SuggestionButton
            onClick={() => handleSuggestionClicked(suggestion)}
            // hide={hideSuggestions}
            key={suggestion}
          >
            {suggestion}
          </SuggestionButton>

        ))}
      </div>
    </div>
  );
}
