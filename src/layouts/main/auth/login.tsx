"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  EyeClosedIconCustom,
  EyeIconCustom,
  FaceBookIcon,
  GoogleIcon,
} from "../icons/custom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/utils/alert";

type Inputs = {
  names: string;
  email: string;
  password: string;
};

const Login = () => {
  const { login, toggleLogin, toggleForgpass, toggleSignup1 } = useModalStore();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", { email, password });
      if (res?.status === 200) {
        toggleLogin(false);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("fullName", res.data.user.fullName);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("uid", res.data.user._id);
        if (res.data.user.image) {
          localStorage.setItem("image", res.data.user.image);
        }
        notifySuccess("Login Successfull");
        setLoading(false);
        router.push("/talk");
      }
    } catch (error: any) {
      if (error?.response.status === 401) {
        notifyError(`Error: ${error?.response?.data?.error}`);
      }
      if (error?.response.status === 400) {
        notifyError(`Error: ${error?.response?.data?.error}`);
      }
      setLoading(false);
    }
  };

  return (
    <Dialog open={login} onOpenChange={(open) => toggleLogin(open)}>
      {/* <DialogTrigger asChild>
        <button className="p-2 px-6 rounded-full bg-transparent ring-1 transition-all duration-500 ring-brand-main text-sm text-brand-main hover:bg-brand-main hover:text-white">
          Login
        </button>
      </DialogTrigger> */}
      <DialogContent className="w-[90%] pt-10 lg:min-w-sm flex flex-col justify-start rounded-[1.9rem]">
        <h1 className="text-xl font-bold text-center mb-2">Log in</h1>
        <div className="flex justify-center flex-col gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center flex-col gap-5 lg:gap-4"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-md lg:text-sm">
                your email
              </Label>
              <Input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className={cn(
                  errors.email?.message && "border-red-600",
                  "border-[.2px] border-brand-grey focus:border-green-600 text-md lg:text-sm px-4 py-6 lg:px-3 lg:py-2"
                )}
              />
              {errors.email?.message && (
                <span className="text-sm text-red-600">
                  Error: E-mail entered incorrectly. Try again
                </span>
              )}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="passoword" className="text-md lg:text-sm">
                Enter a password
              </Label>
              <div className="relative">
                <Input
                  {...register("password", { required: true })}
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
                  Error: Wrong password. You have 2 attempts left
                </span>
              )}
            </div>
            <div className="flex justify-between items-center text-md lg:text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  remember me
                </label>
              </div>
              <p
                onClick={() => {
                  toggleLogin(false);
                  toggleForgpass(true);
                }}
                className="text-brand-main hover:underline cursor-pointer text-sm lg:text-sm"
              >
                forgot password?
              </p>
            </div>
            <div>
              <Button className="w-full rounded-full text-md lg:text-sm bg-brand-main h-15 py-4 lg:h-13 lg:py-2"
                disabled={loading}
              >
                Login
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
                }}
                disabled={loading}
                className="h-15 py-4 absolute top-0  lg:h-13 lg:py-2 w-full text-md lg:text-sm hover:bg-brand-blue rounded-full flex justify-center items-center bg-brand-grey text-black"
              >
                <span className="mr-2 h-4 w-4 flex justify-center items-center">
                  <GoogleIcon />
                </span>
                Sign In with google
              </Button>
              <div className="opacity-[0.00002] max-sm:overflow-hidden overflow-hidden">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var decoded: any = jwtDecode(
                      // @ts-ignore
                      credentialResponse?.credential
                    );

                    async function googleLogin() {
                      try {
                        const res = await axios.post("/api/auth-google", {
                          email: decoded.email,
                        });

                        if (res?.status === 200) {
                          localStorage.setItem("accessToken", res.data.accessToken);
                          localStorage.setItem("fullName", res.data.user.fullName);
                          localStorage.setItem("email", res.data.user.email);
                          localStorage.setItem("uid", res.data.user._id);
                          localStorage.setItem("image", res.data.user.image);
                          // router.refresh();
                          router.push("/talk");
                          notifySuccess("Login Successfull");
                          // 
                        }
                        else if (res?.status === 401 || res?.status === 400) {
                          notifyError(`Error: ${res?.data?.error}`);
                        }
                      } catch (error: any) {
                        // toast.error("An error occurred while logging in");
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
                    notifyError("Login Failed");
                  }}
                  type="standard"
                  theme="outline"
                  size="large"
                  shape="pill"
                  width="340"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center py-5 text-md lg:text-sm">
            <div>
              Don{"'"}t have an account,{" "}
              <span
                onClick={() => {
                  toggleSignup1(true);
                  toggleLogin(false);
                }}
                className="text-brand-main underline hover:no-underline cursor-pointer"
              >
                Signup
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
