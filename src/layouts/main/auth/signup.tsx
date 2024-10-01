"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  EyeClosedIconCustom,
  EyeIconCustom,
  FaceBookIcon,
  GoogleIcon,
} from "../icons/custom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import useModalStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { notifyError, notifySuccess } from "@/utils/alert";

type Inputs = {
  names: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [show, setShow] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState<boolean>(false);
  const [AgreeError, setAgreeError] = useState<String>("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=`{}[\]:;"'<>,.?/]).{8,}$/;
  const onSubmit: SubmitHandler<Inputs> = async ({
    names,
    email,
    password,
  }) => {
    if (!agreeTerm) {
      setAgreeError("Please agree to the terms and conditions")
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/signup", {
        fullName: names,
        email,
        password,
      });
      if (res?.status === 201) {
        toggleSignup1(false);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("fullName", res.data.user.fullName);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("uid", res.data.user._id);
        // router.push('/talk')
        if (localStorage.getItem("accessToken")) {
          notifySuccess("Signup Successfull");
          router.push("/talk");
        }
        setLoading(false);
      }
    } catch (error: any) {
      if (error?.response.status === 400) {
        notifyError(`Error: ${error?.response?.data?.error}`);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (agreeTerm) {
      setAgreeError("")
    }
  }
    , [agreeTerm])

  const { signup1, signup2, toggleSignup1, toggleSignup2, toggleLogin } =
    useModalStore();
  return (
    <Dialog
      open={signup1 || signup2}
      onOpenChange={(open) => {
        if (signup1) {
          toggleSignup1(open);
        }
        if (signup2) {
          toggleSignup2(open);
        }
      }}
    >
      {/* <DialogTrigger asChild>
        <button className="p-2 px-6 rounded-full bg-brand-main transition-all duration-500 text-sm text-white hover:bg-brand-darkblue hover:ring-1 hover:ring-brand-main hover:text-white">
          {istry ? "Try app for free" : "signup"}
        </button>
      </DialogTrigger> */}
      <DialogContent className="w-[90%] pt-10 lg:min-w-sm flex flex-col justify-start rounded-[1.9rem]">
        <h1 className="text-2xl lg:text-xl font-bold text-center xs:mb-2">
          Sign up to continue
        </h1>
        <div className="flex justify-center flex-col xs:gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center flex-col gap-2 xs:gap-5 lg:gap-4"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="fullname" className="text-md lg:text-sm font-normal">
                Your full name
              </Label>
              <Input
                {...register("names", { required: true })}
                type="fullname"
                id="fullname"
                placeholder="Enter your full name"
                className="border-[.2px] border-brand-grey focus:border-green-600 text-md lg:text-sm px-4 py-6 lg:px-3 lg:py-2"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-md lg:text-sm">
                Your email
              </Label>
              <Input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="border-[.2px] border-brand-grey focus:border-green-600 text-md lg:text-sm px-4 py-6 lg:px-3 lg:py-2"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="passoword" className="text-md lg:text-sm">
                Create password
              </Label>
              <div className="relative">
                <Input
                  {...register("password", {
                    required: true, validate: (value) =>
                      passwordRegex.test(value) || "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                  })}
                  type={show ? "text" : "password"}
                  id="passoword"
                  placeholder="Enter password"
                  className={cn(
                    errors.password?.message && "border border-red-600",
                    "border-[.2px] border-brand-grey focus:border-green-600 text-md lg:text-sm px-4 py-6 lg:px-3 lg:py-2"
                  )}
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {!show ? <EyeIconCustom /> : <EyeClosedIconCustom />}
                </span>
              </div>
              {errors.password?.message && (
                <span className="text-sm text-red-600">
                  {/* Error: Wrong password. You have 2 attempts left */}
                  {errors.password?.message || "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"}
                </span>
              )}
            </div>
            <div
              className="flex gap-1 items-center"
            >
              <Checkbox id="terms"
                checked={agreeTerm}
                onCheckedChange={
                  (e: boolean) => {
                    setAgreeTerm(e)
                  }
                }
              // required
              />
              <label
                htmlFor="terms"
                className="text-sm  ml-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the <Link href="/terms"
                  target="_blank"
                  // ref=""

                  className="text-brand-main  inline-flex hover:underline cursor-pointer"
                >terms</Link>  and  <Link href="/privacy-policy" target="_blank"
                  className="text-brand-main  inline-flex hover:underline cursor-pointer"
                >conditions</Link>
              </label>
            </div>
            {AgreeError?.length > 1 && (
              <span className="text-sm text-red-600">
                {AgreeError}
              </span>
            )}
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-brand-main text-md lg:text-sm h-15 py-4 lg:h-13 lg:py-2"
              >
                Signup
              </Button>
            </div>
          </form>

          <div className="flex justify-center items-center text-md lg:text-sm">
            <p>or</p>
          </div>
          <div className="flex justify-center flex-col gap-4">
            <div className="relative">
              <Button
                onClick={() => {
                  // signIn("google");
                  if (!agreeTerm) {
                    setAgreeError("Please agree to the terms and conditions")
                    return;
                  }
                }}
                disabled={loading}
                className="h-15 py-4 absolute top-0  lg:h-13 lg:py-2 w-full text-md lg:text-sm hover:bg-brand-blue rounded-full flex justify-center items-center bg-brand-grey text-black disabled:pointer-events-none disabled:cursor-not-allowed"
              >
                <span className="mr-2 h-4 w-4 flex justify-center items-center">
                  <GoogleIcon />
                </span>
                Signup with google
              </Button>
              <div className={
                cn("opacity-[0.00002] max-sm:overflow-hidden overflow-hidden ",
                  !agreeTerm && "pointer-events-none ",
                  loading && "pointer-events-none cursor-not-allowed"
                )
              }
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var decoded: any = jwtDecode(
                      // @ts-ignore
                      credentialResponse?.credential
                    );

                    async function googleLogin() {
                      try {
                        const res = await axios.post("/api/auth-google-signup", {
                          email: decoded.email,
                          fullName: decoded.name,
                          image: decoded.picture
                        });

                        if (res?.status === 201) {
                          localStorage.setItem("accessToken", res.data.accessToken);
                          localStorage.setItem("fullName", res.data.user.fullName);
                          localStorage.setItem("image", res.data.user.image);
                          localStorage.setItem("email", res.data.user.email);
                          localStorage.setItem("uid", res.data.user._id);
                          router.push("/talk");
                          notifySuccess("Signup Successfull");
                          // router.refresh();
                        } else if (res?.status === 400 || res?.status === 401) {
                          notifyError(`Error: ${res?.data?.error}`);
                        }
                      } catch (error: any) {
                        // toast.error("An error occurred during signup");
                        if (error?.response.status === 401) {
                          notifyError(`Error: ${error?.response?.data?.error}`);
                        }
                        if (error?.response.status === 400) {
                          notifyError(`Error: ${error?.response?.data?.error}`);
                        }
                      }
                    }


                    googleLogin();
                  }}
                  onError={() => {
                    
                  }}
                  type="standard"
                  theme="outline"
                  size="large"
                  shape="pill"
                  width="400"
                />
              </div>
            </div>

          </div>
          <div className="flex text-md lg:text-sm justify-center items-center py-5">
            <div>
              Already have an account,{" "}
              <span
                onClick={() => {
                  toggleLogin(true);
                  if (signup1) {
                    toggleSignup1(false);
                  } else if (signup2) {
                    toggleSignup2(false);
                  }
                }}
                className="text-brand-main underline hover:no-underline cursor-pointer"
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Signup;
