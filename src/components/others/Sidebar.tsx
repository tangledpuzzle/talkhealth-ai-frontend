import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconHistory } from "@tabler/icons-react";
import { Menu, MessageSquare, Pen, SquarePen, X } from "lucide-react";
import FeedbackForm from "@/components/others/FeedbackForm";
import { useChatContext } from "@/context/Chat.context";
import { summarizePDF } from "../../utils/api";
import { nanoid } from 'nanoid';
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter, scrollToElement } from "@/utils/utils";
import config from "../../config/config.json";

export default function Sidebar({ page }: { page?: string }) {
  const router = useRouter();
  const {
    state: { data, isAiTyping, messageLoading, prompts: suggestions },
    dispatch,
  } = useChatContext();
  const [isDownloading, setIsDownloading] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const pathname = usePathname();
  const [IsMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("fullName")
    ) {
      setUserLogin(true);
      setFullName(localStorage.getItem("fullName") as string);
      if (localStorage.getItem("image")) {
        setImageUrl(localStorage.getItem("image") as string);
      }
    } else {
      setUserLogin(false);
      setFullName("");
      router.push("/main");
    }
  }),
    [pathname];

  const newChat = () => {
    const threadId = nanoid();
    localStorage.setItem("threadId", threadId);
    dispatch({
      type: "SET_INITIAL_MESSAGE",
      payload: [
        {
          type: "ai",
          message: config.initnewChat,
          image: null,
          file: null,
        },
      ],
      threadId: threadId
    });
    let initprompts = config.initprompts;
    dispatch({
      type: "ADD_PROMPTS",
      payload: {
        type: "prompts",
        message: initprompts,
        image: null,
        file: null,
      },
      threadId: threadId
    });
    scrollToElement('scrollItem');
    setIsMobileMenuOpen(false)
  };
  const onsummarizePDF = async () => {
    setIsDownloading(true);
    await summarizePDF();
    setIsDownloading(false);
  };

  const logOutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    router.push("/main");
    router.refresh();
  };

  // useEffect(() => {
  //   if (router.pathname.includes("/talk")) {
  //     setTabs([
  //       { label: "History", href: "/history", icon: IconHistory },
  //     ]);
  //   } else if (router.pathname.includes("/history")) {
  //     setTabs([
  //       { label: "History", href: "/talk", icon: IconHistory },
  //     ]);
  //   }
  // }, [router.pathname]);

  return (
    <>
      <div>
        <div className="hidden md:block h-screen">
          <div className="h-full relative border-r bg-gpt-sider border-gpt-green-dark/10 py-6 gap-y-2 w-32 z-50 hidden lg:flex flex-col justify-start items-center ">
            <Link href={"/main"}>
              {" "}
              <img
                src={"/small_logo.png"}
                className="flex w-16 mb-4 h-16 flex-col justify-center items-center transition-colors duration-300 p-2 gap-y-2 rounded-xl outline-0 border-0 hover:bg-black/5 bg-transparent text-gpt-green-dark hover:text-gpt-green-dark/90"
                alt="small_logo"
              />
            </Link>

            <button
              onClick={newChat}
              className={cn(
                "flex text-white  flex-col justify-center items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-2  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90 ",
                isAiTyping || messageLoading ? "cursor-not-allowed" : "",
                pathname === "/talk" ? "text-white" : "text-white/50"
              )}
            >
              <Pen className="h-5 w-5" />

              <span className="text-base font-oracle">New Chat</span>
            </button>


            <Link
              href={"/history"}
              className={cn(
                "flex text-white  flex-col justify-center items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-2  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90 ",
                pathname === "/history" ? "text-white" : "text-white/50"
              )}
            >
              <IconHistory className="h-6 w-6" />
              <span className="text-base font-oracle">History</span>
            </Link>


            {/* {data.length >= 2 && (
        <button
          onClick={onsummarizePDF}
          className="flex flex-col justify-center items-center transition-colors duration-300 h-fit w-full p-2 gap-y-2  outline-0 border-0 hover:bg-black/40 bg-transparent text-white hover:text-white/90"
        >
          {isDownloading ? (
            <div className={styles.loader}></div>
          ) : (
            <>
              <IconPrinter className="h-7 w-7" />
              <span className="text-xs font-oracle">Summarize</span>
            </>
          )}
        </button>
      )} */}
            {/* </FeedbackForm> */}

            {data.length >= 2 && (
              <FeedbackForm>
                <button className="flex text-white/50  flex-col justify-center items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-2  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-base font-oracle">Feedback</span>
                </button>
              </FeedbackForm>
            )}

            <div className="absolute bottom-0 left-0 w-full ">
              <Link
                href="/profile"
                // className="flex flex-col justify-center items-center gap-y-2 cursor-pointer w-full"
                className={cn(
                  "flex text-white  flex-col justify-center items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-3  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90 ",
                  pathname === "/profile"
                    ? "text-white bg-[#2A2A39]"
                    : "text-white/50"
                )}
              >
                {/* <div 
       className="bg-white/10 w-10 h-10 rounded-full"
       /> */}
                <span
                  className={cn(
                    "bg-white/10 w-12 h-12  justify-center items-center text-xl text-white rounded-full ",
                    imageUrl ? "hidden" : "flex"
                  )}
                >
                  {fullName?.charAt(0).toUpperCase() || "U"}
                </span>
                <img
                  src={imageUrl || "/user.png"}
                  alt="user"
                  className={cn(
                    "w-12 h-12 rounded-full object-cover",
                    imageUrl ? "flex" : "hidden"
                  )}
                />
                <h4 className="text-base font-oracle text-white/80 text-center">
                  {capitalizeFirstLetter(fullName) || "User"}
                </h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:hidden block absolute z-50  w-full">
          <div className="bg-gpt-sider h-[72px] border-b max-md:border-white/10 border-solid px-4 text-white   py-3 flex justify-between items-center">
            <div
              className="cursor-pointer hover:opacity-75"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu
              // size={24}
              />
            </div>
            <div>
              <Link href={"/main"}>
                {" "}
                <img
                  src={"/small_logo.png"}
                  className="flex w-12 h-12 flex-col justify-center items-center transition-colors duration-300 rounded-xl outline-0 border-0 hover:bg-black/5 bg-transparent text-gpt-green-dark hover:text-gpt-green-dark/90"
                  alt="small_logo"
                />
              </Link>
            </div>

            <button onClick={() => {
              newChat();
              setIsMobileMenuOpen(false);
            }}>
              <SquarePen />
            </button>
          </div>
          <div
            className={cn(
              "transition-all duration-300 ease-in-out transform fixed top-0 right-0 w-full h-screen bg-gpt-sider  text-white border-gpt-green-dark/10 z-50",
              IsMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="bg-gpt-sider h-[72px] border-b max-md:border-white/10 border-solid px-4 text-white   py-3 flex justify-between items-center">
              <div
                className="cursor-pointer hover:opacity-75"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X
                // size={24}
                />
              </div>
              <div>
                <Link href={"/main"}>
                  {" "}
                  <img
                    src={"/small_logo.png"}
                    className="flex w-12 h-12 flex-col justify-center items-center transition-colors duration-300 rounded-xl outline-0 border-0 hover:bg-black/5 bg-transparent text-gpt-green-dark hover:text-gpt-green-dark/90"
                    alt="small_logo"
                  />
                </Link>
              </div>

              <div onClick={() => {
                newChat();
                setIsMobileMenuOpen(false);
              }}>
                <SquarePen />
              </div>
            </div>

            <div className="flex flex-col gap-4 max-md:items-center">
              <button
                onClick={() => {
                  newChat();
                  setIsMobileMenuOpen(false);

                }}
                className={cn(
                  "flex text-white gap-4 justify-start items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-2  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90 ",
                  isAiTyping || messageLoading ? "cursor-not-allowed" : "",
                  pathname === "/talk" ? "text-white" : "text-white/50"
                )}
              >
                <Pen className="h-5 w-5" />

                <span className="text-base font-oracle">New Chat</span>
              </button>


              <Link
                href={"/history"}
                className={cn(
                  "flex text-white gap-4 justify-start items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-2  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90 ",
                  pathname === "/history" ? "text-white" : "text-white/50"
                )}
              >
                <IconHistory className="h-6 w-6" />
                <span className="text-base font-oracle">History</span>
              </Link>


              {/* {data.length >= 2 && (

              <button
                onClick={onsummarizePDF}
                className="flex flex-col justify-center items-center transition-colors duration-300 h-fit w-full p-2 gap-y-2  outline-0 border-0 hover:bg-black/40 bg-transparent text-white hover:text-white/90"
              >
                {isDownloading ? (
                  <div className={styles.loader}></div>
                ) : (
                  <>
                    <IconPrinter className="h-7 w-7" />
                    <span className="text-xs font-oracle">Summarize</span>
                  </>
                )}
              </button>
            )} */}
              {/* </FeedbackForm> */}
              {data.length >= 2 && (
                <FeedbackForm>
                  <button className="flex gap-4 text-white/50  justify-start items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-2  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90">
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-base font-oracle">Feedback</span>
                  </button>
                </FeedbackForm>
              )}

              <div className="absolute bottom-10 left-0 w-full ">
                <Link
                  href="/profile"
                  // className="flex flex-col justify-center items-center gap-y-2 cursor-pointer w-full"
                  className={cn(
                    "flex text-white gap-4  justify-start items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-3  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90 ",
                    pathname === "/profile"
                      ? "text-white bg-[#2A2A39]"
                      : "text-white/50"
                  )}
                >
                  {/* <div
        className="bg-white/10 w-10 h-10 rounded-full"
        /> */}
                  <span
                    className={cn(
                      "bg-white/10 w-12 h-12 gap-4 justify-center items-center text-xl text-white rounded-full ",
                      imageUrl ? "hidden" : "flex"
                    )}
                  >
                    {fullName?.charAt(0).toUpperCase() || "U"}
                  </span>
                  <img
                    src={imageUrl || "/user.png"}
                    alt="user"
                    className={cn(
                      "w-12 h-12 rounded-full object-cover",
                      imageUrl ? "flex" : "hidden"
                    )}
                  />
                  <h4 className="text-base font-oracle text-white/80 text-center">
                    {capitalizeFirstLetter(fullName) || "User"}
                  </h4>
                </Link>
              </div>

              {/* <div className="flex flex-col gap-4 mt-2" onClick={logOutUser}>
                <button className="flex text-white/50  gap-4 justify-center items-center transition-colors duration-300 h-fit w-full px-6 py-5 gap-y-2  outline-0 border-0 hover:bg-[#2A2A39] bg-transparent hover:text-white/90">
                  <IconLogout className="h-6 w-6" />
                  <span className="text-base font-oracle">Logout</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
