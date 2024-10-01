"use client";

import useModalStore from "@/lib/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MenuIconCustom } from "./icons/custom";
import { usePathname } from "next/navigation";

const Nav = () => {
  const { toggleLogin, toggleSignup2, toggleNavmodal } = useModalStore();
  const [userLogin, setUserLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scroll, setscroll] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setUserLogin(true)
    } else {
      setUserLogin(false)
    }
  }), [pathname];

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setscroll(currentScrollPos);
      setIsVisible(false);
      setIsVisible(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ss = useMemo(() => {
    if (scroll < 100) setIsVisible(true);
  }, [scroll]);
  return (
    <nav
      className={cn(
        `w-full sticky  top-0 z-20 flex justify-between items-center px-10 py-6  transition-colors duration-300`,
        { "bg-[#EBF5FC]": scroll < 30 },
        { "shadow-md bg-[#EBF5FC]": scroll > 30 }
      )}
    >
      <Link href={"/main#hero"} className="navlink">
        <Image
          src={"/logo.svg"}
          alt="TalkHealth-AI Logo Image"
          width={170}
          height={30}
        />
      </Link>
      <div className="hidden lg:flex items-center justify-center gap-10 text-sm">
        <Link href={"/main#howitworks"} className="navlink">
          How it works
        </Link>
        <Link href={"/main#keyfeatures"} className="navlink">
          Key features
        </Link>
        <Link href={"/main#ourmission"} className="navlink">
          Our mission
        </Link>
        <Link href={"#blog"} className="navlink">
          Blog
        </Link>
      </div>
      {userLogin ? (
        <>
          <div className="hidden lg:flex gap-2 text-sm">
            <Link
              href={"/talk"}
              className="p-2 px-6 rounded-full bg-transparent ring-1 transition-all duration-500 ring-brand-main text-sm text-brand-main hover:bg-brand-main hover:text-white"
            >
              Dashboard
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="hidden lg:flex gap-2 text-sm">
            {/* <Login /> */}
            <button
              onClick={() => void toggleLogin(true)}
              className="p-2 px-6 rounded-full bg-transparent ring-1 transition-all duration-500 ring-brand-main text-sm text-brand-main hover:bg-brand-main hover:text-white"
            >
              Login
            </button>
            {/* <Signup istry={true} /> */}
            <button
              onClick={() => void toggleSignup2(true)}
              className="p-2 px-6 rounded-full bg-brand-main transition-all duration-500 text-sm text-white hover:bg-brand-darkblue hover:ring-1 hover:ring-brand-main hover:text-white"
            >
              Try app for free
            </button>
          </div>
        </>
      )}
      <div className="block lg:hidden">
        {/* <Login /> */}
        <button
          onClick={() => void toggleNavmodal(true)}
          className="bg-transparent active:bg-transparent hover:bg-transparent"
          aria-label="nav button"
        >
          <MenuIconCustom />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
