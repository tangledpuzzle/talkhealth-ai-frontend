import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import shareWithLove from "@/components/icons/share-with-love.svg";

export default function Referrals() {
  const router = useRouter();

  const [copied, setCopied] = useState<boolean>(false);
  const [referralUrl, setReferralUrl] = useState<string>("");

  useEffect(() => {
    // Get the full URL including origin
    setReferralUrl(window.location.origin + "/referral");
  }, [router.asPath]);

  function copyLink() {
    // Create a textarea element
    const textarea = document.createElement("textarea");

    // Set the value to the link
    textarea.value = referralUrl;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <div className="h-full overflow-y-auto text-black overflow-x-hidden w-full relative px-4 sm:px-6 flex">
      <div className="mx-auto max-w-max w-auto flex-col flex-grow h-full flex justify-center items-center gap-y-6">
        <div className="w-fit h-fit relative flex -mt-28 sm:-mt-40 overflow-hidden">
          <Image
            src={shareWithLove}
            alt="share with love"
            className="w-32 md:w-40 h-auto relative"
          />
          <div className="w-full h-full absolute"></div>
        </div>

        <h1 className="text-[36px] font-alpina-condensed text-gpt-green-dark">
          Spread the word
        </h1>

        <p className="text-black/50 font-oracle text-xl text-center">
          Share a link to TalkHealthAI with a friend...
        </p>

        <button
          onClick={copyLink}
          disabled={!referralUrl}
          className="font-oracle text-lg text-white hover:text-gpt-green-dark bg-gpt-green-dark hover:bg-gpt-green-light rounded-lg py-3 px-8 duration-300 transition-colors disabled:bg-gpt-green-dark/50 disabled:text-white/50 disabled:hover:bg-gpt-green-dark/50 disabled:hover:text-white/50"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
