"use client";
import useModalStore from "@/lib/store";
import Link from "next/link";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavModal = () => {
  const { navmodal, toggleNavmodal, toggleLogin, toggleSignup2 } =
    useModalStore();
  const [userLogin, setUserLogin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUserLogin(true);
    } else {
      setUserLogin(false);
    }
  }),[pathname];

  return (
    <Dialog open={navmodal} onOpenChange={(open) => toggleNavmodal(open)}>
      {/* <DialogTrigger asChild>
        <button className="bg-transparent active:bg-transparent hover:bg-transparent">
          <MenuIconCustom />
        </button>
      </DialogTrigger> */}
      <DialogContent className="h-[70%] z-[99999] bg-white w-[75%] rounded-[1.5rem] flex justify-center items-center">
        <div className="flex flex-col justify-center gap-10 px-3 w-[95%]">
          <div className="flex flex-col items-center justify-center gap-5 text-lg">
            <Link
              onClick={() => void toggleNavmodal(false)}
              href={"/main#howitworks"}
              className="navlink"
            >
              How it works
            </Link>
            <Link
              onClick={() => void toggleNavmodal(false)}
              href={"/main#keyfeatures"}
              className="navlink"
            >
              Key features
            </Link>
            <Link
              onClick={() => void toggleNavmodal(false)}
              href={"/main#ourmission"}
              className="navlink"
            >
              Our mission
            </Link>
            <Link
              onClick={() => void toggleNavmodal(false)}
              href={"/blog"}
              className="navlink"
            >
              Blog
            </Link>
          </div>
          {userLogin ? (
            <>
              <div
              className="justify-center flex"
              >
                <Link
                  href={"/talk"}
                  className="p-4 w-auto px-4 rounded-full bg-transparent ring-1 transition-all duration-500 ring-brand-main text-lg text-brand-main hover:bg-brand-main hover:text-white"
                >
                  Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center gap-5">
                <div>
                  <button
                    onClick={() => {
                      toggleSignup2(true);
                      toggleNavmodal(false);
                    }}
                    className="p-4 w-full px-4 rounded-full bg-brand-main transition-all duration-500 text-sm text-white hover:bg-transparent hover:ring-1 hover:ring-brand-main hover:text-brand-main"
                  >
                    {"Try app for free"}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      toggleLogin(true);
                      toggleNavmodal(false);
                    }}
                    className="p-4 w-full px-4 rounded-full bg-transparent ring-1 transition-all duration-500 ring-brand-main text-sm text-brand-main hover:bg-brand-main hover:text-white"
                  >
                    Login
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavModal;
