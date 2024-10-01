import { MoveLeft } from "lucide-react";
import React from "react";
import {Manrope} from 'next/font/google'
import { cn } from "@/lib/utils";
import Link from "next/link";

const manrope =  Manrope({ subsets: ["latin"] })

const TermsCondition = () => {
  return (
    <div className={cn("bg-brand-main-gradient min-h-screen",
    manrope.className)}
    >
      <div className="md:max-w-[50vw] relative mb-10 pt-5 max-w-[80vw] mx-auto">
        <Link href="/main" className="md:absolute -left-36 top-8 flex gap-2 px-6 py-2.5 w-fit cursor-pointer text-black border border-solid border-black rounded-full">
          <MoveLeft />
          <span>Back</span>
        </Link>
        <div className="max-md:mt-4">
          <h1 className="font-medium text-3xl text-start py-3.5 max-md:text-xl max-md:font-bold">
          Terms of Service
          </h1>
        </div>
        <div>
       <p className="text-base pb-4">
       Welcome to TalkHealth.ai. Before you begin using our AI healthcare
      chatbot, please read and acknowledge the following disclaimer:
       </p>
      <ul>
        <li className="mb-3 text-base">
          <span className="font-semibold">Nature of Service:</span>
           TalkHealth.ai is an AI-powered chatbot designed to provide
          health-related information. It does not provide medical advice. It is
          not a substitute for professional medical advice, diagnosis, or
          treatment.
        </li>
        <li className="mb-3 text-base">
          <span className="font-semibold">
            Consent to Share Health Information:
          </span>
           By using TalkHealth.ai, you consent to share your personal health
          information with the chatbot. This information will be used to provide
          personalized health advice. We commit to maintaining the
          confidentiality and security of your health data as outlined in our
          Privacy Policy.
        </li>
        <li className="mb-3 text-base">
          <span className="font-semibold">
            No Substitute for Professional Advice:
          </span>
           The information and advice provided by TalkHealth.ai are for
          informational purposes only and should not replace the need for
          consultation with a healthcare professional.
        </li>
        <li className="mb-3 text-base">
          <span className="font-semibold">No Doctor-Patient Relationship:</span>
           Interaction with TalkHealth.ai does not establish a doctor-patient
          relationship. Our service is not a licensed medical provider.
        </li>
        <li className="mb-3 text-base">
          <span className="font-semibold">Accuracy and Limitations:</span> While
          we strive for accuracy, TalkHealth.ai operates on algorithms that may
          not address your specific health situation. We are not liable for any
          inaccuracies or misinterpretations of the information provided.
        </li>
        <li className="mb-3 text-base">
          <span className="font-semibold">Not for Emergencies:</span>
           TalkHealth.ai is not designed to handle medical emergencies. In case
          of an urgent health issue, please contact emergency services
          immediately.
        </li>
        <li className="mb-3 text-base">
          <span className="font-semibold">Data Privacy:</span> We respect your
          privacy and the confidentiality of your information. Please refer to
          our Privacy Policy for details on how we use and protect your data.
        </li>
        <li className="mb-3 text-base">
          <span className="font-semibold">User Responsibility:</span> You are
          responsible for the accuracy of the information you provide to
          TalkHealth.ai and for your decisions or actions based on the advice
          received.
        </li>
      </ul>
    <p
    className="text-base "
    >
    By using TalkHealth.ai, you acknowledge and agree to these terms.
    </p>
      <br />
      <span className="font-semibold text-base ">
        I have read and understood this disclaimer and agree to its terms.
      </span>
        </div>
   

      </div>
    </div>
  );
};

export default TermsCondition;
