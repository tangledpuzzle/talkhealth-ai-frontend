import { useState, useEffect } from "react";
import { useChatContext } from "@/context/Chat.context";
import { useRouter } from "next/router";
import { IconX } from "@tabler/icons-react";
import { getHistory } from "@/utils/api";
import { convertToChatType, scrollToElement } from "@/utils/utils";
import TabButton from "../TabButton/TabButton";

type Chat = {
  id: string;
  name: string;
};
interface ChatData {
  [key: string]: Chat[];
}
export default function HistorySidebar({
  activeChat,
  className,
}: {
  className?: string;
  activeChat?: string;
}) {
  const router = useRouter();
  const {
    state: { data, isAiTyping, messageLoading, prompts: suggestions },
    dispatch,
  } = useChatContext();
  const [alldatas, setAlldatas] = useState<ChatData | any>({});
  const [dataFormat, setDataFormat] = useState<any>([]);

  const [activechat, setActiveChat] = useState<
    { id: string; name: string } | undefined
  >();

  const getinitialData = async () => {
    const datas = await getHistory();
    
    const keys = Object.keys(datas);
    const historyData = keys.map((key) => {
      let lastItem = datas[key][datas[key].length - 1];
      const prompts = JSON.stringify(lastItem["prompts"]).split("; ")
        .map((prompt) => prompt.trim().replaceAll('"', "")
        )
      return {
        id: key,
        name: lastItem["content"],
        timestamp: lastItem["date"],
        time: new Date((lastItem["date"]) * 1000).getTime(),
        title: prompts[prompts.length - 1].slice(1, prompts[prompts.length - 1].length - 1)
      };
    });
    const sortedHistoryData = historyData.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    let last7Days = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    let last30Days = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
    let lastMonth = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
    let lastYear = new Date().getTime() - 365 * 24 * 60 * 60 * 1000;

    const last7DaysData = sortedHistoryData.filter((item) => item.time > last7Days);
    const last30DaysData = sortedHistoryData.filter((item) => item.time > last30Days && item.time < last7Days);
    const lastMonthData = sortedHistoryData.filter((item) => item.time > lastMonth && item.time < last30Days);
    const lastYearData = sortedHistoryData.filter((item) => item.time > lastYear && item.time < lastMonth);
    const olderThanYearData = sortedHistoryData.filter((item) => item.time < lastYear);

    setDataFormat([
      last7DaysData,
      last30DaysData,
      lastMonthData,
      lastYearData,
      olderThanYearData,
    ]);
    setAlldatas(datas);
    return datas;
  };

  useEffect(() => {
    getinitialData();
  }, []);


  const onClickChat = (chat: { id: string; name: string }) => {
    setActiveChat(chat);
    const firstThreadData = alldatas[chat.id]; // access the data for this 'threadId'
    const chatDataPayload = convertToChatType(firstThreadData);
    localStorage.setItem("threadId", chat.id);
    dispatch({
      type: "ADD_PROMPTS",
      payload: {
        type: "prompts",
        message: firstThreadData[firstThreadData.length - 1].prompts,
      },
      threadId: chat.id
    });
    dispatch({ type: "SET_INITIAL_MESSAGE", payload: chatDataPayload, threadId: chat.id });
    
    // router.push("/talk");
    
    scrollToElement('scrollItem');
  };

  const onDeleteThread = (id: string, index: number) => {
    const filteredData = dataFormat[index]?.filter((item:any) => item.id !== id);
    setDataFormat(dataFormat.map((item:any, index_o:number) => index_o === index ? filteredData : item));
  }

  return (
    <div
      className={`h-full lg:border-r border-gpt-green-dark/10 md:bg-gpt-subtle bg-gpt-green-dark/30 w-full lg:w-96 shrink-0 flex flex-col ${className}`}
    >
      <div className="bg-white h-full overflow-y-auto border-gpt-green-dark/5 rounded-t-[28px] md:rounded-none mt-3 md:mt-0">
        {/* <div className="w-full  py-5 lg:hidden justify-between items-center sticky top-0 flex md:border-b-0 border-b border-gpt-green-dark/5 px-5 md:mb-0 mb-3 z-50">
          <button
            onClick={() => router.push("/talk")}
            className="p-2 rounded-full shrink-0 bg-black/5 hover:bg-black/10 outline-0 border-0"
          >
            <IconX className="h-5 w-5 stroke-[3] text-neutral-800" />
          </button>
        </div> */}

        <div className="flex justify-between items-center mt-6 max-md:mt-16 mx-4">
          <h3 className="w-full py-2 text-[32px] font-alpina-condensed font-semibold font-alpina-condensed leading-normal ">
            Chat history
          </h3>
          <div>
            <button
              onClick={() => router.push("/talk")}
              className="p-2 rounded-full shrink-0  hover:bg-black/10 outline-0 border-0"
            >
              <IconX className="h-5 w-5 stroke-[3] text-gray-500" />
            </button>
          </div>
        </div>

        <div className="pt-4 pb-8 overflow-y-auto flex flex-col gap-5">
          {dataFormat[0]?.length>0 &&
            <div className="px-5">
              <div>
                <span className="px-3.5 text-[#828282] text-base">
                  Previous 7 days
                </span>
                <div className="border border-[#D3D3D3] border-solid rounded-xl mt-3">
                  {dataFormat[0]?.map((chat: any, index: number) => (
                    <TabButton
                      key={chat.id}
                      id={chat.id}
                      name={chat.name}
                      onClick={() => onClickChat(chat)}
                      onDelete={(id) => onDeleteThread(id, 0)}
                      activeChat={activechat}
                      time={chat.timestamp}
                      index={index}
                      isLast={index === dataFormat[0]?.length - 1}
                      title={chat.title}
                    />
                  ))}
                </div>
              </div>
            </div>}
          {dataFormat[1]?.length>0 && <div className="px-5">
            <div>
              <span className="px-3.5 text-[#828282] text-base">
                Previous 30 days
              </span>
              <div className="border border-[#D3D3D3] border-solid rounded-xl mt-3">
                {dataFormat[1]?.map((chat: any, index: number) => (
                  <TabButton
                    key={chat.id}
                    id={chat.id}
                    name={chat.name}
                    onClick={() => onClickChat(chat)}
                    onDelete={(id) => onDeleteThread(id, 1)}
                    activeChat={activechat}
                    time={chat.timestamp}
                    index={index}
                    isLast={index === dataFormat[1]?.length - 1}
                    title={chat.title}
                  />
                ))}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}