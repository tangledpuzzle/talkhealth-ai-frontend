import IconApple from "@/components/icons/IconApple";
import IconGoogle from "@/components/icons/IconGoogle";
import { IconDeviceMobile } from "@tabler/icons-react";
import IconFacebook from "@/components/icons/IconFacebook";
import ButtonWithIcon from "@/components/others/ButtonWithIcon";

export default function UserAccount() { 
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden w-full relative px-4 sm:px-6 flex">
      <div className="mx-auto max-w-3xl h-fit w-full mt-10 sm:mt-14">
        <h2 className="text-center text-[28px] sm:text-[36px] leading-none text-gpt-green-dark font-alpina-condensed">
          Create an account or sign in to save and see your conversation
          history.
        </h2>

        <div className="sm:mt-14 mt-10 w-full grid grid-cols-1 gap-y-3 mx-auto max-w-[360px]">
          <ButtonWithIcon
            icon={IconGoogle}
            className="bg-white text-gpt-green-dark border border-gpt-green-dark/20"
            // onClick={handleGoogleAuth}
          >
            Continue with Google
          </ButtonWithIcon>

          <ButtonWithIcon
            icon={IconFacebook}
            className="bg-[#1877F2] text-white border border-[#1877F2]"
            // onClick={handleFacebookAuth}
          >
            Continue with Facebook
          </ButtonWithIcon>

          <ButtonWithIcon
            icon={IconApple}
            className="bg-black text-white border border-black"
          >
            Continue with Apple
          </ButtonWithIcon>

          <Divider />

          <ButtonWithIcon
            icon={IconDeviceMobile}
            className="bg-transparent text-gpt-green-dark border border-gpt-green-dark/20"
          >
            Use phone number
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="sm:my-10 my-4 flex justify-between items-center gap-x-4">
      <div className="border-b border-gpt-green-dark/10 flex-grow"></div>
      <span className="text-base text-black/50 font-oracle">or</span>
      <div className="border-b border-gpt-green-dark/10 flex-grow"></div>
    </div>
  );
}
