import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const Mission = () => {
  return (
    <div
      id="ourmission"
      className="bg-brand-lightblue py-20 px-[1rem] lg:px-[6rem] w-full flex justify-center items-center flex-col gap-10"
    >
      <div className="flex justify-center items-center flex-col gap-5">
        <h1 className="text-5xl text-brand-darkblue font-bold text-center">
          Our mission is clear
        </h1>
        <div className="text-brand-darkblue text-center max-w-3xl">
          {/* Collaboration is the cornerstone of our approach.{" "}
          <span className="font-semibold">
            We work closely with healthcare professionals️, incorporating their
            expertise and insights to refine our AI algorithms.
          </span>{" "} */}
          TalkHealth.ai transforms health engagement through AI-driven insights, offering accessible, precise, and personalized medical information. Our mission is to empower individuals with the knowledge needed for informed wellness decisions, fostering a healthier tomorrow through the seamless integration of technology and medical expertise.
        </div>
        <Image
          src={"/Doctors.png"}
          height={80}
          width={180}
          className="hidden lg:block"
          alt="doctors"
        />
        <Image
          src={"/Doctors.png"}
          height={100}
          width={380}
          className="block lg:hidden"
          alt="doctors"
        />
      </div>
      <div className="rounded-[1rem] bg-white shadow-xl p-5  flex flex-col lg:flex-row justify-center gap-3">
        <div className="w-full lg:w-[65%] flex flex-col justify-start gap-3">
          <h1 className="text-4xl text-brand-darkblue font-bold">
            Leave a message
          </h1>
          <hr />
          <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-2">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="fullname">Your full name</Label>
              <Input
                type="fullname"
                id="fullname"
                placeholder="Enter your full name"
                className="border-[.2px] border-brand-grey focus:border-green-600"
              />
            </div>
            <div className="grid w-ful items-center gap-1.5">
              <Label htmlFor="email">Your e-mail</Label>
              <Input
                type="email"
                id="c-email"
                placeholder="example@gmail.com"
                className="border-[.2px] border-brand-grey focus:border-green-600"
              />
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              placeholder="Type your message here."
              className="border-[.2px] min-h-[130px] border-brand-grey focus:border-green-600"
              id="message"
            />
          </div>
          <div>
            <Button className="w-full lg:w-min rounded-full px-3 bg-brand-main">
              Send message
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-[35%] p-5 text-white bg-brand-darkblue rounded-[1rem] min-h-full">
          <h1 className="text-xl">Contact information</h1>
          <hr color="#FFFFFF26" />
          <div className="flex justify-center flex-col lg:flex-row gap-2 my-3">
            <div className="lg:w-[30%] flex flex-col pt-4 justify-start items-center">
              <Image src={"/contact.jpg"} width={80} height={80} alt="avatar" style={{}} />
            </div>
            <div className="lg:w-[70%] flex flex-col justify-start gap-2 items-center lg:items-baseline">
              <p className="font-medium text-center lg:text-start">
                Thomas Dittrich
              </p>
              <p className="font-extralight text-sm text-center lg:text-start">
                CEO and Founder of TalkHealth.ai
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center lg:items-baseline">

            <div className="flex justify-center items-center gap-2">
              <span>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.504 9.72555C16.1611 9.40765 19.8389 9.40765 23.496 9.72555L25.2579 9.87871C26.4308 9.98067 27.4354 10.6803 27.9559 11.681C28.0225 11.8091 27.9726 11.9641 27.8499 12.04L20.5396 16.5654C18.9718 17.536 16.9948 17.5564 15.4073 16.6183L8.0482 12.2697C7.9293 12.1995 7.87473 12.0548 7.92831 11.9276C8.40449 10.7964 9.47506 9.98885 10.7421 9.87871L12.504 9.72555Z"
                    fill="white"
                  />
                  <path
                    d="M7.92232 14.228C7.74036 14.1205 7.50819 14.2362 7.48698 14.4465C7.19096 17.3814 7.2626 20.3441 7.70192 23.2656C7.93352 24.8057 9.1905 25.9864 10.7421 26.1213L12.504 26.2744C16.1611 26.5923 19.8389 26.5923 23.496 26.2744L25.2579 26.1213C26.8095 25.9864 28.0665 24.8057 28.2981 23.2656C28.7502 20.259 28.8129 17.2087 28.4862 14.19C28.4633 13.9782 28.2272 13.8646 28.0461 13.9768L21.4607 18.0534C19.3395 19.3665 16.6649 19.3941 14.5171 18.1249L7.92232 14.228Z"
                    fill="white"
                  />
                </svg>
              </span>
              <Link href="mailto:info@talkhealth.ai" className="font-extralight text-sm">
                info@talkhealth.ai
              </Link>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_90_2544"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="6"
                    y="6"
                    width="24"
                    height="24"
                  >
                    <rect x="6" y="6" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_90_2544)">
                    <path
                      d="M18.8 19C19.405 19 19.9229 18.7846 20.3538 18.3538C20.7846 17.9229 21 17.405 21 16.8C21 16.195 20.7846 15.6771 20.3538 15.2463C19.9229 14.8154 19.405 14.6 18.8 14.6C18.195 14.6 17.6771 14.8154 17.2463 15.2463C16.8154 15.6771 16.6 16.195 16.6 16.8C16.6 17.405 16.8154 17.9229 17.2463 18.3538C17.6771 18.7846 18.195 19 18.8 19ZM18.8 30C15.8483 27.4883 13.6438 25.1554 12.1863 23.0013C10.7288 20.8471 10 18.8533 10 17.02C10 14.27 10.8846 12.0792 12.6538 10.4475C14.4229 8.81583 16.4717 8 18.8 8C21.1283 8 23.1771 8.81583 24.9463 10.4475C26.7154 12.0792 27.6 14.27 27.6 17.02C27.6 18.8533 26.8713 20.8471 25.4137 23.0013C23.9563 25.1554 21.7517 27.4883 18.8 30Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </span>
              <p className="font-extralight text-sm">Charleston, SC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
