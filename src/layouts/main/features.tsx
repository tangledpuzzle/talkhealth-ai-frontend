"use client";

import useModalStore from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Features = () => {
  const { toggleSignup1, toggleSignup2 } = useModalStore(); 
  return (
    <div id="keyfeatures" className="w-full bg-white flex justify-center items-center">
      <div className="grid lg:grid-cols-2 grid-cols-1 px-2 lg:px-5 py-10 w-full min-w-[10rem] max-w-[100rem]">
        <div className="flex justify-start flex-col px-5 gap-3">
          <h1 className="text-[2em] text-center lg:text-start font-bold text-brand-darkblue">
            Key Features
          </h1>
          <div className="block lg:hidden">
            <Image
              src={"/Images.png"}
              height={200 * 1.8}
              width={180 * 1.8}
              alt="image"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-[1rem] bg-brand-lightblue p-5">
            <p className="font-semibold text-brand-darkblue">
              Personalised symptom chat
            </p>
            <p className="text-brand-darkblue">
              Describe symptoms in our chat, AI suggests potential diseases for
              better understanding and exploration.
            </p>
            <Link
              href={"#"}
              className="underline hover:no-underline text-brand-main"
            >
              see more
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-[1rem] bg-brand-darkblue p-5">
            <p className="font-semibold text-white">
              AI analysis of lab results
            </p>
            <p className="text-white">
              Discover health insights effortlessly – our AI examines your lab
              results for clear, comprehensive answers, eliminating confusion.
            </p>
            <Link
              href={"#"}
              className="underline hover:no-underline text-brand-main"
              onClick={() => void toggleSignup1(true)}
            >
              Signup
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-[1rem] bg-brand-lightblue p-5">
            <p className="font-semibold text-brand-darkblue">
              Doctor-ready questions
            </p>
            <p className="text-brand-darkblue">
              Talkhealth generates insightful questions based on your health,
              fostering productive discussions with your healthcare provider.
            </p>
          </div>
          <div>
            <Button
              onClick={() => void toggleSignup2(true)}
              className="w-full lg:w-min rounded-full px-3 bg-brand-main hover:bg-brand-darkblue"
            >
              Try app for free
            </Button>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image
            src={"/Images.png"}
            height={200 * 3.5}
            width={180 * 3.5}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
