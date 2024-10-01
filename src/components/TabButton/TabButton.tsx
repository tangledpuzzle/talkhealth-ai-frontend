import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Download, Pen, Trash } from "lucide-react";
import { summarizePDF, deleteThread, renameThread } from "@/utils/api";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { notifyError } from "@/utils/alert";

export default function TabButton({
  id,
  name,
  onClick,
  activeChat,
  time,
  index,
  isLast,
  title,
  onDelete
}: {
  id: string;
  name: string;
  onClick?: () => void;
  activeChat?: { id: string; name: string };
  time: string | undefined;
  index: number;
  isLast: boolean;
  title: string;
  onDelete: (id:string) => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [reNameText, setReNameText] = useState(title);
  const [title1, setTitle] = useState(title);
  const [isOpen, setIsOpen] = useState(false);

  const onsummarizePDF = async () => {
    if (!isDownloading) {
      setIsOpen(true);
      setIsDownloading(true);
      await summarizePDF();
      setIsDownloading(false);
      setIsOpen(true);
    }
  };
  const onChangeName = async () => {
    renameThread(id, reNameText)
    setTitle(reNameText);
    setOpen(false);
  }

  const handleItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    action: () => void
  ): void => {
    event.preventDefault(); // Prevent any default behavior tied to clicking the item
    action(); // Execute the desired action for the item
    setIsOpen(true); // Keep the dropdown open
  };

  const handleDelete = async()=>{
    const response = await deleteThread(id);
    if(response.ok){
      onDelete(id)
    }else{
      notifyError('An error occurs while deleting your chat history');
    }
  }


  return (
    <div
      className={`flex justify-between px-3.5 items-center gap-x-2 py-3  text-lg font-oracle duration-300 transition-colors  text-gpt-green-dark
        ${activeChat?.name === name
          ? "bg-[#FAFAFA]"
          : "hover:bg-[#ebebeb] bg-white"
        }
        ${index === 0
          ? "rounded-t-xl"
          : "border-t border-[#D3D3D3] border-solid"
        } ${isLast && "rounded-b-xl"}
        `}
    >
      <div className="flex justify-between items-center w-full">
        <p
          className="text-left font-light text-base max-md:text-sm cursor-pointer"
          onClick={onClick}
        >
          {title1.length > 35 ? title1.slice(0, 35) + '...' : title1}
        </p>
        {/* <span className="text-[13px] self-end">{diff_time(time)}</span> */}

        <div>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger>
              <div className="flex gap-0.5 w-fit px-2 py-4 -mt-3 cursor-pointer">
                <div className="bg-[#828282] rounded-full w-1 h-1" />
                <div className="bg-[#828282] rounded-full w-1 h-1" />

                <div className="bg-[#828282] rounded-full w-1 h-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-md:mr-8 mr-0">
              <DropdownMenuItem className=" text-base"
                onClick={(e) => handleItemClick(e, onsummarizePDF)}
              >
                {/* <Download className="mr-2 " size={18} />  */}
                {isDownloading ? <div className="loader-download mr-2" ></div> : <Download className="mr-2 " size={18} />}
                Download summary
              </DropdownMenuItem>
              <DropdownMenuItem className=" text-base"
                onClick={() => setOpen(true)}
              >
                <Pen className="mr-2 " size={18} /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 text-base" onClick={handleDelete}>
                <Trash className="mr-2 " size={18} /> Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            leaveTo="opacity-0"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leave="ease-in duration-200"
            enter="ease-out duration-300"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0">
              <Transition.Child
                as={Fragment}
                leave="ease-in duration-200"
                enter="ease-out duration-300"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gpt-subtle p-4 text-left shadow-xl transition-all md:my-8 w-full md:max-w-lg md:p-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Rename chat
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full border-solid text-lg font-light"
                      value={reNameText}
                      onChange={(e) => setReNameText(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gpt-green-dark border border-transparent rounded-md hover:bg-gpt-green-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gpt-green-dark"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={onChangeName}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
