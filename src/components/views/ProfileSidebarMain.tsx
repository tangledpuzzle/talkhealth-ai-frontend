import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Cake,
  ChevronRight, 
  LogOut,
  Mail,
  Sparkles,
  Trash2,
  UserCog,
} from "lucide-react";
import { IconX } from "@tabler/icons-react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";

export default function ProfileSidebar({
  activeTab,
  className,
}: {
  className?: string;
  activeTab?: string;
}) {
  const router = useRouter();
  const [activeTabState, setActiveTabState] = useState("setting");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(localStorage.getItem("fullName")){
      setFullName(localStorage.getItem("fullName") as string);
    }
    if(localStorage.getItem("email")){
      setEmail(localStorage.getItem("email") as string);
    }
  }, []);

  return (
    <div
      className={`h-full lg:border-r border-gpt-green-dark/10 md:bg-gpt-subtle bg-gpt-green-dark/30 w-full lg:w-96 shrink-0 flex flex-col ${className}`}
    >
      <div className="bg-white h-full overflow-y-auto border-gpt-green-dark/5 rounded-t-3xl md:rounded-none mt-3 md:mt-0">
        {activeTabState === "setting" && (
          <div className="flex justify-between items-center mx-4 pt-5   max-md:pt-16 max-md:mt-2">
            <h3 className="font-alpina-condensed py-2  w-full font-semibold leading-normal text-2xl max-md:text-xl ">
              Settings
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
        )}

        <div
          className={cn(
            "",
            activeTabState === "setting"
              ? "hidden"
              : "flex items-center gap-3 mx-4 pt-5 max-md:pt-16 max-md:mt-2"
          )}
        >
          <ArrowLeft
            className="h-6 w-6 cursor-pointer"
            strokeWidth={3}
            onClick={() => setActiveTabState("setting")}
          />
          <h3 className="font-alpina-condensed py-2  w-full font-semibold leading-normal text-2xl max-md:text-xl">
            {activeTabState === "account"
              ? "Account"
              // : activeTabState === "accountManagement"
              // ? "Account management"
              : "Upgrade plan"}
          </h3>
        </div>

        <div className="overflow-y-auto overflow-x-hidden pt-4 pb-8">
          {activeTabState === "setting" ? (
            <>
              <SettingTab setActiveTabState={setActiveTabState} />
            </>
          ) : activeTabState === "account" ? (
            <AccountTab setActiveTabState={setActiveTabState} name={fullName} email={email} />
          // ) : activeTabState === "accountManagement" ? (
          //   <AccountManagement setActiveTabState={setActiveTabState} />
          ) : (
            <UpgradeTab setActiveTabState={setActiveTabState} />
          )}
        </div>
      </div>
    </div>
  );
}

const SettingTab = ({
  setActiveTabState,
}: {
  setActiveTabState: (state: string) => void;
}) => {
  return (
    <>
      <div className=" h-fit w-full ">
        <hr className="border-solid border border-[#E6E6E6] " />
        <div
          className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer"
          onClick={() => setActiveTabState("account")}
        >
          <span className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <UserCog className="h-6 w-6" />

            <span>Account</span>
          </span>

          <ChevronRight className="h-5 text-black" />
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
        <div
          className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer"
          onClick={() => setActiveTabState("upgrade")}
        >
          <span className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <Sparkles className="h-6 w-6" />

            <span>Upgrade plan</span>
          </span>

          <ChevronRight className="h-5 text-black" />
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
      </div>
    </>
  );
};

const AccountTab = ({
  setActiveTabState,
  name,
  email
}: {
  setActiveTabState: (state: string) => void;
  name: string;
  email: string;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const logOutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    router.push("/main");
    router.refresh();
  };
  return (
    <>
      <div className=" h-fit w-full ">
        <hr className="border-solid border border-[#E6E6E6] " />
        <div className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer">
          <div className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <Name />

            <span>Name</span>
          </div>
          <span className="font-light text-[#444444]">
            {name}
          </span>
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
        <div
          className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer"
          // onClick={() => setActiveTabState("accountManagement")}
        >
          <span className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <Mail className="h-6 w-6" />

            <span>Email</span>
          </span>

          <span className="font-light text-[#444444]">
            {email}
          </span>
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
        <div
          className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer"
          // onClick={() => setActiveTabState("accountManagement")}
        >
          <span className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <Cake className="h-6 w-6" />

            <span>Your birthday</span>
          </span>

          <span className="font-light text-[#444444]">1992/08/14</span>
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
        <div
          className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer"
          onClick={logOutUser}
        >
          <div className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <LogOut className="h-6 w-6" />

            <span>Logout</span>
          </div>
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
      </div>
    </>
  );
};

const UpgradeTab = ({
  setActiveTabState,
}: {
  setActiveTabState: (state: string) => void;
}) => {
  return (
    <>
      <div className=" h-fit w-full ">
        <p className=" px-5 sm:px-[3%] lg:px-4 text-lg max-md:text-base">
          You can ask only <span className="font-bold">3</span> of your{" "}
          <span className="font-bold">medical questions.</span> To continue
          freely using our application you need to upgrade your plan
        </p>
        <p className="font-light text-lg max-md:text-base px-5 sm:px-[3%] lg:px-4 text-[#444444] my-5">
          USD $20/month{" "}
        </p>
        <div className="flex w-full cursor-pointer  justify-center py-4 text-white bg-brand-main ">
          <Sparkles className="h-6 w-6 mr-2 fill-white" />{" "}
          <span className="text-lg max-md:text-base font-semibold">
            Upgrade
          </span>
        </div>
      </div>
    </>
  );
};

const AccountManagement = ({
  setActiveTabState,
}: {
  setActiveTabState: (state: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const logOutUser = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("uid");

    const res = await fetch("/api/logout");
    if (res.status === 200) {
      router.push("/main");
      router.refresh();
    }
  };
  return (
    <>
      <div className=" h-fit w-full ">
        <hr className="border-solid border border-[#E6E6E6] " />
        <div
          className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <Trash2 className="h-6 w-6" />

            <span>Delete account</span>
          </span>
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
        <div
          className="flex justify-between px-5 sm:px-[3%] lg:px-4  items-center gap-x-2 py-3 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark hover:bg-slate-50 cursor-pointer"
          onClick={logOutUser}
        >
          <div className="flex justify-center items-center gap-x-2 text-lg max-md:text-base font-oracle">
            <LogOut className="h-6 w-6" />

            <span>Logout</span>
          </div>
        </div>
        <hr className="border-solid border border-[#E6E6E6] " />
        {/* {open && <DeleteAccountConfirm open={open} setOpen={setOpen} />} */}
        <div
          className={cn(
            "transition-opacity duration-300",
            open ? "opacity-100 block" : "opacity-0 hidden"
          )}
        >
          <DeleteAccountConfirm open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
};

const Name = () => {
  return (
    <>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_132_676"
          // style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="25"
        >
          <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_132_676)">
          <path
            d="M4 22.5C3.45 22.5 2.97917 22.3042 2.5875 21.9125C2.19583 21.5208 2 21.05 2 20.5V9.5C2 8.95 2.19583 8.47917 2.5875 8.0875C2.97917 7.69583 3.45 7.5 4 7.5H9V4.5C9 3.95 9.19583 3.47917 9.5875 3.0875C9.97917 2.69583 10.45 2.5 11 2.5H13C13.55 2.5 14.0208 2.69583 14.4125 3.0875C14.8042 3.47917 15 3.95 15 4.5V7.5H20C20.55 7.5 21.0208 7.69583 21.4125 8.0875C21.8042 8.47917 22 8.95 22 9.5V20.5C22 21.05 21.8042 21.5208 21.4125 21.9125C21.0208 22.3042 20.55 22.5 20 22.5H4ZM4 20.5H20V9.5H15C15 10.05 14.8042 10.5208 14.4125 10.9125C14.0208 11.3042 13.55 11.5 13 11.5H11C10.45 11.5 9.97917 11.3042 9.5875 10.9125C9.19583 10.5208 9 10.05 9 9.5H4V20.5ZM6 18.5H12V18.05C12 17.7667 11.9208 17.5042 11.7625 17.2625C11.6042 17.0208 11.3833 16.8333 11.1 16.7C10.7667 16.55 10.4292 16.4375 10.0875 16.3625C9.74583 16.2875 9.38333 16.25 9 16.25C8.61667 16.25 8.25417 16.2875 7.9125 16.3625C7.57083 16.4375 7.23333 16.55 6.9 16.7C6.61667 16.8333 6.39583 17.0208 6.2375 17.2625C6.07917 17.5042 6 17.7667 6 18.05V18.5ZM14 17H18V15.5H14V17ZM9 15.5C9.41667 15.5 9.77083 15.3542 10.0625 15.0625C10.3542 14.7708 10.5 14.4167 10.5 14C10.5 13.5833 10.3542 13.2292 10.0625 12.9375C9.77083 12.6458 9.41667 12.5 9 12.5C8.58333 12.5 8.22917 12.6458 7.9375 12.9375C7.64583 13.2292 7.5 13.5833 7.5 14C7.5 14.4167 7.64583 14.7708 7.9375 15.0625C8.22917 15.3542 8.58333 15.5 9 15.5ZM14 14H18V12.5H14V14ZM11 9.5H13V4.5H11V9.5Z"
            fill="#212131"
          />
        </g>
      </svg>
    </>
  );
};

const DeleteAccountConfirm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
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
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end max-md:items-center justify-center p-4 text-center md:items-center md:p-0">
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
                  <div className="mt-2 relative">
                    <button
                      title="Close"
                      type="button"
                      onClick={() => setOpen(false)}
                      className="outline-none absolute right-3 leading-[0.6] -mt-1 text-3xl text-neutral-700 duration-300 transition-colors hover:text-neutral-900 font-light"
                    >
                      &times;
                    </button>
                    <div className="flex justify-center mb-4">
                      <Trash2 size={64} className="text-[#50B887]" />
                    </div>
                    <h2 className="text-3xl font-bold max-md:text-xl max-md:font-semibold text-center ">
                      Are you sure you want <br />
                      to delete your account?
                    </h2>
                    <h4 className="mb-8 mt-4 text-lg  max-md:text-base  text-center">
                      This action cannot be undone.
                    </h4>
                    <div className="flex gap-4 justify-center max-md:flex-col flex-row">
                      <button className="hover:text-brand-main border-2 hover:bg-white py-4 px-12 w-fit text-base max-md:w-full max-md:text-sm max-md:font-medium mb-4 hover:border-brand-main bg-brand-main  text-white border-solid rounded-full cursor-pointer font-semibold">
                        I’ll stay
                      </button>
                      <button className="text-brand-main border-2 text py-4 px-8 w-fit text-base max-md:w-full max-md:text-sm max-md:font-medium mb-4 border-brand-main hover:bg-brand-main hover:text-white border-solid rounded-full cursor-pointer font-semibold">
                        Yes, delete
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
