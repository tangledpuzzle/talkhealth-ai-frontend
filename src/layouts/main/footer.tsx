import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { TiSocialFacebook } from "react-icons/ti";
import { SocialIcon } from "@/layouts/main/icons/custom";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col lg:flex-row items-baseline justify-between gap-4 p-10 bg-footer text-sm">
        <div className="lg:w-[20%] flex flex-col justify-center items-start gap-4">
          <Link href={'/talk'}>
            <Image
              src={"/logo.svg"}
              alt="TalkHealth-AI Logo Image"
              width={170}
              height={30}
            />
          </Link>
          <span className="text-white font-light">
            An AI-powered medical platform that will give you a clear picture of
            your health
          </span>
        </div>
        <div className="flex flex-col justify-center font-extralight items-start gap-3">
          <span className="font-bold text-white">Navigation</span>
          <Link href={"/main#howitworks"} className="text-white">
            How it works
          </Link>
          <Link href={"/main#keyfeatures"} className="text-white">
            Key features
          </Link>
          <Link href={"/main#ourmission"} className="text-white">
            Our mission
          </Link>
          <Link href={"/main#blog"} className="text-white">
            Blog
          </Link>
        </div>

        <div className="flex flex-col justify-center items-start gap-4">
          <span className="font-bold text-white">Contact</span>
          <div className="flex items-center justify-center gap-2 text-white">
            <HiMail />
            <Link href="mailto:info@talkhealth.ai" className="font-extralight">
              info@talkhealth.ai
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start gap-4">
          <span className="font-bold text-white">Follow us</span>
          <div className="flex items-center justify-center gap-2">
            <Link target="_blank" href={'https://www.facebook.com/talkhealthai'} aria-label="Visit our Facebook page"><SocialIcon icon={<TiSocialFacebook />} /></Link>
            <Link target="_blank" href={'https://www.linkedin.com/company/talkhealthai/'} aria-label="Visit our Facebook page"><SocialIcon icon={<FaLinkedinIn className="text-sm" />} /></Link>
            {/* <SocialIcon icon={<FaInstagram className="text-sm" />} /> */}
            {/* <SocialIcon icon={<FaTwitter className="text-sm" />} /> */}
          </div>
        </div>
      </footer>
      <div className="px-5 lg:px-10 py-5 bg-footer text-white border-t-[.2px] border-[#FFFFFF26] font-extralight text-sm">
        <div className="w-full flex flex-col lg:flex-row justify-center gap-5 lg:justify-between items-baseline lg:items-center">
          <p>© 2024, TalkHealth. All rights reserved.</p>
          <div className="flex flex-col lg:flex-row justify-center gap-2 lg:gap-5 items-baseline lg:items-center">
            <Link href={'/privacy-policy'}>Privacy and policy</Link>
            <Link href={'/terms'}>Terms and conditions</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
