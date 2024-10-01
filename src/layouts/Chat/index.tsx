import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollIntoView } from "@mantine/hooks";
import { useChatContext } from "@/context/Chat.context";
import AIChat from "@/layouts/Chat/AIChatMain";
import UserChat from "@/layouts/Chat/UserChatMain";
import ChatInput from "@/layouts/Chat/ChatInputMain";
import SuggestionButton from "@/layouts/Chat/SuggestionButton";
import DocumentDropzone from "@/components/others/DocumentDropzone";
import { postMessage } from "@/utils/api";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import PreChat from "./PreChatMain";
import { Download, ImagePlus } from "lucide-react";
import { summarizePDF } from "@/utils/api";
import { cn } from "@/lib/utils";
import UpgradeModal from "./UpgradeModal";
/**
 * A description of the entire function.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - The form event.
 * @return {Promise<void>} Promise that resolves when the form is submitted.
 */

const processData = (data: any[]) => {
  return data.length < 2 ? data : data?.slice(0, -2);
}


export default function Chat() {
  const [query, setQuery] = useState("");
  const [queryImage, setQueryImage] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [showImage, setShowImages] = useState<string[]>([]);
  const [filesList, setFileList] = useState<File[]>([]);
  const [filetype, setFileType] = useState<string>('image');
  const [linkUrl, setLinkUrl] = useState<string[]>([]);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const date = new Date();
  const hour = date.getHours();
  const [uploading, setUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [startChat, setStartChat] = useState(false);
  const [hideSuggestions, setHideSuggestions] = useState<boolean>(false);
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

  const onsummarizePDF = async () => {
    if (!isDownloading) {
      setIsDownloading(true);
      await summarizePDF();
      setIsDownloading(false);
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
    setStartChat(true);
  }
  /**
   * Submits the form and performs the necessary actions.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @return {Promise<void>} Promise that resolves when the form is submitted.
   */
  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // if (showImage.length > 0) {
    //   setIsImageSelected(true);
    //   await getUrls()
    //   // setLinkUrl(["https://pdfimageupload.s3.amazonaws.com/"+filesList[0].name])
    // }
    setIsImageSelected(true);
    let imageUrl = "";
    let type = "";
    if (filesList.length > 0) {
      imageUrl = "https://pdfimageupload.s3.amazonaws.com/" + hour.toString() + filesList[0].name;
      type = filetype;
    }
    let thread = localStorage.getItem('threadId') || undefined;
    dispatch({
      type: "ADD_USER_MESSAGE",
      payload: {
        type: "user",
        image: type === "image" ? imageUrl : "",
        file: type === "pdf" ? imageUrl : "",
        message: query,
      },
      threadId: thread
    });
    postMessage(query, imageUrl, emit, type);
    setQuery("");
    setLinkUrl([]);
    setShowImages([]);
    setFileList([]);
    setQueryImage([]);
    setSelectedPdf(null);
  }

  async function enterEvent() {
    submitForm(event as any);
  }
  /**
   * Handles the click event on a suggestion.
   *
   * @param {string} suggestion - The clicked suggestion.
   * @return {void} This function does not return anything.
   */
  async function handleSuggestionClicked(suggestion: string) {
    if (showImage.length > 0) {
      // await getUrls()
      // setLinkUrl(["https://pdfimageupload.s3.amazonaws.com/"+filesList[0].name])
    }
    //  console.log("linkUrl ",linkUrl);
    // let imageUrl = "https://pdfimageupload.s3.amazonaws.com/"+Date.now().toString()+filesList[0].name;
    let imageUrl = "";
    if (filesList.length > 0) {
      imageUrl = "https://pdfimageupload.s3.amazonaws.com/" + hour.toString() + filesList[0].name;
    }
    if (isAiTyping) return;
    let thread = localStorage.getItem('threadId') || undefined;
    dispatch({
      type: "ADD_USER_MESSAGE",
      payload: {
        type: "user",
        image: "",
        file: "",
        message: suggestion,
      },
      threadId: thread
    });

    postMessage(suggestion, "", emit, "");
    setSelectedPdf(null);
    setQueryImage([]);
    setFileList([]);
    setShowImages([]);
    setQuery("");
  }

  useEffect(() => {
    if (data.length > 1) {
      setStartChat(true);
    } 
  }, [data]);

  return (
    <div className="h-full w-full flex flex-col justify-between relative bg-[#F4F4F4]">
      <DocumentDropzone setFile={setFile} className="absolute w-full h-full" />

      <div
        ref={scrollableRef}
        className={cn("overflow-y-auto items-center overflow-x-hidden pb-44 max-md:pb-5 flex flex-col relative",
          !startChat && "pb-0 flex h-full")}
      >
        {/* Header of chat interface */}
        {startChat && <div
          className={cn(
            " shrink-0 w-full bg-gradient-to-b z-10 from-gpt-subtle via-gpt-subtle/90 to-gpt-subtle/0 sticky top-0",
            startChat ? "h-28 2xl:h-32 max-md:h-20" : "h-24 mt-1 xl:h-0 "
          )}
        >
          <div className="2xl:max-w-5xl px-5 max-w-3xl mx-auto max-md:p-0 max-md:mx-0 h-full pb-6 2xl:pb-8">
            <div
              className={cn(
                "w-full max-md:bg-gpt-sider max-md:text-white max-md:hidden  flex justify-end max-md:justify-center items-end h-full pb-3 border-b border-solid max-md:border-none  border-[#D3D3D3] ",
                !startChat ? "hidden" : ""
              )}
            >
              <div className="flex gap-5">
                <label htmlFor="file-upload" className="bg-white px-4 items-center cursor-pointer py-1.5 max-md:px-2 max-md:py-1 w-fit flex gap-3 border border-solid border-black max-md:border-white/50 hover:bg-black hover:text-white rounded-md">
                  <ImagePlus size={22} />

                  <label
                    htmlFor="file-upload"
                    className="text-base cursor-pointer max-md:text-xs"
                  >
                    Upload test results
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
                <button onClick={onsummarizePDF} className="bg-white px-4 items-center cursor-pointer py-1.5 w-fit max-md:px-2 max-md:py-1 flex gap-3 max-md:border-white/50 border border-solid border-black hover:bg-black hover:text-white rounded-md">
                  {isDownloading ? <div className="loader-download"></div> : <Download size={22} />}
                  <span className="text-base max-md:text-xs">Download summary</span>
                </button>
              </div>
            </div>
          </div>
        </div>}

        <div className={
          cn("relative h-full max-md:mt-4 space-y-6 px-5 max-md:px-3 text-primary-700 w-full mx-auto 2xl:max-w-5xl max-w-4xl ",
            !startChat && "h-full flex justify-center flex-col")
        }>

          <div
            className={cn(
              "w-full flex-grow flex flex-col gap-y-5 md:gap-y-10",
              !startChat ? "hidden" : ""
            )}
          >
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


          {data.length > 1 &&
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
          }

          {(<div ref={targetRef} id="scrollItem" className="w-full" />)}

          {!startChat && (
            <div data-aos="fade-down">
              <h1 className="text-[#212131] text-4xl max-md:text-xl max-md:pb-0 pb-5 pt-10 font-semibold text-center w-full">
                Welcome to Talkhealth.AI, your personal health assistant!
              </h1>
            </div>
          )}

          {!startChat && (
            <PreChat setFile={setFile} setStartChat={setStartChat} />
          )}


        </div>
      </div>
      <div
        className={cn(
          " w-full flex flex-col justify-between gap-2 md:gap-4 bottom-0 mt-auto mx-auto md:right-auto md:left-auto right-0 left-0 px-2 py-4 z-10 2xl:max-w-[74rem] max-w-3xl"
          ,
          !startChat ? "pb-1" : ""
        )}
      >
        {startChat && (
          <>
            <form onSubmit={submitForm} className="w-full bg-gpt-subtle ">
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
            <div
              className="overflow-auto py-2"
            >
              <div
                className={`${hideSuggestions ? "hidden" : "max-md:flex max-md:w-max max-md:overflow-x-scroll"
                  }  gap-2 grid md:justify-center 2xl:flex md:grid-cols-2  2xl:w-full md:w-full lg:w-[96%] mx-auto`}
              >
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
          </>
        )}
        <p className={
          cn("text-[14px] xs:text-xs text-black/50 text-center md:pb-4 font-oracle block",
            startChat ? "hidden text-[10px]" : "")
        }>
          By using TalkHealth.ai, you agree to our{" "}
          <Link href="/terms" className="underline text-gpt-green-dark">
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="underline text-gpt-green-dark"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
      {/* <UpgradeModal /> */}
    </div >
  );
}
