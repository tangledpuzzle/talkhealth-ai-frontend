import { MoveLeft } from "lucide-react";
import React from "react";
import {Manrope} from 'next/font/google'
import { cn } from "@/lib/utils";
import Link from "next/link";

const manrope =  Manrope({ subsets: ["latin"] })

const PrivacyPolicySection = () => {
  return (
    <div className={cn("bg-brand-main-gradient min-h-screen",
    manrope.className)}
    >
      <div className="md:max-w-[50vw] relative pb-10 pt-5 max-w-[80vw] mx-auto">
        <Link href="/main" className="md:absolute -left-36 top-8 flex gap-2 px-6 py-2.5 w-fit cursor-pointer text-black border border-solid border-black rounded-full">
          <MoveLeft />
          <span>Back</span>
        </Link>
        <div className="max-md:mt-4">
          <h1 className="font-medium text-3xl max-md:text-xl max-md:font-bold text-start py-3.5">
            Privacy Policy
          </h1>
        </div>
        <div>
          <h2 className="font-bold py-2.5">1. Introduction</h2>
          <p className="font-extralight max-md:text-sm">
            TalkHealth.ai (“we,” “our,” or “us”) is committed to protecting your
            privacy. This Privacy Policy describes how we collect, use,
            disclose, and safeguard your personal information when you use our
            website and related services (“Services”). By accessing or using the
            Services, you consent to the practices described in this Privacy
            Policy.
          </p>
        </div>

        <div>
          <h2 className="font-bold py-2.5">2. Information We Collect</h2>
          <p className="font-extralight max-md:text-sm">
            a. <strong>Information You Provide:</strong> We may collect personal
            information that you voluntarily provide to us, such as your name,
            email address, and health-related information when you use our
            Services.
          </p>
          <p className="font-extralight max-md:text-sm">
            b. <strong>Information We Automatically Collect:</strong> When you
            access or use our Services, we may automatically collect certain
            information, including your IP address, browser type, device
            information, and usage data.
          </p>
        </div>
        <div>
          <h2 className="font-bold py-2.5">3. How We Use Your Information</h2>
          <p className="font-extralight max-md:text-sm">
            We may use the information we collect for various purposes,
            including:
          </p>
          <p className="font-extralight max-md:text-sm">a. To provide and improve our Services.</p>
          <p className="font-extralight max-md:text-sm">b. To personalize your experience on our website.</p>
          <p className="font-extralight max-md:text-sm">
            c. To communicate with you, respond to your inquiries, and provide
            customer support.
          </p>
          <p className="font-extralight max-md:text-sm">
            d. To analyze and monitor usage patterns, troubleshoot technical
            issues, and conduct research.
          </p>
          <p className="font-extralight max-md:text-sm">e. To comply with legal obligations and protect our rights.</p>
        </div>
        <div>
          <h2 className="font-bold py-2.5">
            4. Disclosure of Your Information
          </h2>
          <p className="font-extralight max-md:text-sm">
            We may share your information with third parties under the following
            circumstances:
          </p>
          <p className="font-extralight max-md:text-sm">a. With your consent.</p>
          <p className="font-extralight max-md:text-sm">
            b. To comply with legal obligations, such as responding to subpoenas
            or court orders.
          </p>
          <p className="font-extralight max-md:text-sm">
            c. To protect our rights, privacy, safety, or property, or that of
            our users or others.
          </p>
          <p className="font-extralight max-md:text-sm">d. In connection with a merger, sale, or asset transfer.</p>
        </div>
        <div>
          <h2 className="font-bold py-2.5">5. Security</h2>
          <p className="font-extralight max-md:text-sm">
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction.
            However, no data transmission over the internet or storage system
            can be guaranteed to be 100% secure.
          </p>
        </div>
        <div>
          <h2 className="font-bold py-2.5">6. Your Choices</h2>
          <p className="font-extralight max-md:text-sm">You have the right to:</p>
          <p className="font-extralight max-md:text-sm">
            a. Access, correct, update, or delete your personal information.
          </p>
          <p className="font-">b. Opt-out of receiving marketing communications from us.</p>
          <p className="font-extralight max-md:text-sm">
            c. Request that we restrict the processing of your personal
            information.
          </p>
        </div>
        <div>
          <h2 className="font-bold py-2.5">7. Children’s Privacy</h2>
          <p className="font-extralight max-md:text-sm">
            Our Services are not intended for children under the age of 13. We
            do not knowingly collect or solicit personal information from
            children under 13. If you believe that we may have collected
            personal information from a child under 13, please contact us.
          </p>
        </div>
        <div>
          <h2 className="font-bold py-2.5">
            8. Changes to this Privacy Policy
          </h2>
          <p className="font-extralight max-md:text-sm">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any changes by posting the
            updated Privacy Policy on our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
