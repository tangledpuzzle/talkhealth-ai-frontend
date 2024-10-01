import { FaPlay } from "react-icons/fa";
import Card from "./how-it-works/Card";
import { Button } from "@/components/ui/button";
import useModalStore from "@/lib/store";

const HowItWorks = () => {
  const {  toggleSignup2 } = useModalStore(); 
  return (
    <div id="howitworks" className="min-h-screen h-full w-full flex items-stretch bg-how-it-works-bg bg-cover bg-center">
      <div className="bg-hiw-bg w-full px-5 py-10 sm:px-10 flex flex-col items-center justify-center gap-4">
        <span className="text-4xl sm:text-5xl text-center text-white font-bold">
          How It Works
        </span>
        <p className="text-white text-sm flex flex-col text-center tracking-wide">
          <span>
            Do you want to{" "}
            <strong>
              quickly understand the results of your medical test?
            </strong>
          </span>
          <span>Here are how your journey to health empowerment begin</span>
        </p>
        {/* <div className="w-full grid mt-5 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> */}
        <div className="w-full min-w-[10rem] max-w-[100rem] grid mt-5 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* cards */}
          <Card
            icon={"/step1.png"}
            nbr={1}
            content="Snap a photo or take a screenshot of your medical tests and upload them effortlessly. Your health information remains confidential and protected throughout the process."
            title="Upload your test results"
          />
          <Card
            icon={"/step2.png"}
            nbr={2}
            content="Once your test results are uploaded, our AI technology swiftly analyzes the data. Within moments, it provides a comprehensive interpretation of your results in plain language."
            title="Instant AI interpretation"
          />
          <Card
            icon={"/step3.png"}
            nbr={3}
            content="Engage with our AI to ask questions. It  also generates questions for your doctor's appointment."
            title="Ask questions & prepare for appointments"
          />
        </div>
        <p className="text-white text-center mt-10 mb-5">
          Join us on this transformative journey towards a healthier 💪 and more
          informed world.{" "}
        </p>
        <div className="flex w-full justify-center flex-col sm:flex-row items-center gap-4">
          <Button className="text-white w-full sm:w-fit rounded-full bg-brand-main hover:bg-transparent hover:ring-1 hover:ring-brand-main hover:text-brand-main"
          onClick={() => void toggleSignup2(true)}
          >
            Get started
          </Button>
          <div className="flex items-center text-brand-main gap-2">
            <div className="bg-transparent border border-brand-main rounded-full flex items-center justify-center h-8 w-8">
              <FaPlay size={10} />
            </div>
            <span>See how to use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
