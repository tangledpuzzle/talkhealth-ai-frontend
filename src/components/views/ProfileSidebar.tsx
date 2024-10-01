import Link from "next/link";
import { useRouter } from "next/router";
import {
  UserIcon,
  ChevronRightIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  IconLicense,
  IconShieldCheck, 
  IconX,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function ProfileSidebar({
  activeTab,
  className,
}: {
  className?: string;
  activeTab?: string;
}) {
  const router = useRouter();
 
  return (
    <div
      className={`h-full lg:border-r border-gpt-green-dark/10 md:bg-gpt-subtle bg-gpt-green-dark/30 w-full lg:w-96 shrink-0 flex flex-col ${className}`}
    >
      <div className="bg-gpt-subtle h-full overflow-y-auto border-gpt-green-dark/5 rounded-t-3xl md:rounded-none mt-3 md:mt-0">
        {/* <div className="w-full z-10 bg-gpt-subtle py-5 lg:hidden sticky top-0 flex md:border-b-0 border-b border-gpt-green-dark/5 px-5 md:mb-0 mb-3">
          <button
            onClick={() => router.push("/discover")}
            className="p-2 rounded-full shrink-0 bg-black/5 hover:bg-black/10 outline-0 border-0"
          >
            <ArrowLeftIcon className="h-5 w-5 text-neutral-800" />
          </button>
        </div> */}

        {/* <h3 className="font-alpina-condensed py-2 bg-gpt-subtle w-full leading-normal text-[36px] px-4 sm:px-[3%] lg:px-6">
          Profile
        </h3> */}

        <div className="flex justify-between items-center mx-4">
          <h3 className="font-alpina-condensed py-2  w-full font-semibold leading-normal text-[32px] ">
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

        <div className="overflow-y-auto overflow-x-hidden pt-4 pb-8">
          <div className="grid grid-cols-1 gap-y-1 h-fit w-full px-4 sm:px-[3%] lg:px-4">
            <TabButton
              label="Account"
              icon={UserIcon}
              activeTab={activeTab}
              href="/profile/account"
              isPage
            />
            <TabButton
              label="Upgrade plan"
              icon={IconSparkles}
              activeTab={activeTab}
              href="/profile/account"
              isPage
            />
            <TabButton
              label="General"
              icon={IconSettings}
              activeTab={activeTab}
              href="/profile/account"
              isPage
            />

            <TabButton
              label="Privacy policy"
              icon={IconShieldCheck}
              activeTab={activeTab}
              href="/profile/privacy"
              isPage
            />

            <TabButton
              label="Terms of service"
              icon={IconLicense}
              activeTab={activeTab}
              href="/profile/terms"
              isPage
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  href,
  icon,
  label,
  activeTab,
  isPage = false,
  externalLink = false,
}: {
  icon: any;
  href: string;
  label: string;
  isPage?: boolean;
  activeTab?: string;
  externalLink?: boolean;
}) {
  const ButtonIcon = icon as any;

  return (
    <Link
      href={`${href}`}
      target={externalLink ? "_blank" : "_self"}
      className={`flex justify-between items-center gap-x-2 py-3 px-2 rounded-lg duration-300 transition-colors z-[1] text-gpt-green-dark
      ${activeTab === label ? "bg-gpt-green-light/70" : "hover:bg-black/5"}`}
    >
      <span className="flex justify-center items-center gap-x-2 text-lg font-oracle">
        <ButtonIcon className="h-6 w-6" />
        <span>{label}</span>
      </span>

      {isPage && <ChevronRightIcon className="h-7 w-auto text-black/40" />}
    </Link>
  );
}
