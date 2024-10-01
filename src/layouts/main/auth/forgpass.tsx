"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalStore from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Forgpass = () => {
  const { forgpass, toggleForgpass, toggleLogin } = useModalStore();
  return (
    <Dialog open={forgpass} onOpenChange={(open) => toggleForgpass(open)}>
      {/* <DialogTrigger asChild>
        <p className="text-brand-main hover:underline text-md lg:text-sm">
          forgot password?
        </p>
      </DialogTrigger> */}
      <DialogContent className="rounded-[1.9rem]">
        <h1 className="text-md font-bold text-center">Forgot password?</h1>
        <div className="flex justify-center flex-col gap-3">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-md lg:text-sm">
              Your e-mail
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="border-[.2px] border-brand-grey focus:border-green-600 text-md lg:text-sm px-4 py-6 lg:px-3 lg:py-2"
            />
          </div>
          <div>
            <Button className="w-full rounded-full bg-brand-main text-md lg:text-sm px-4 py-6 lg:px-3 lg:py-2">
              Send verification
            </Button>
          </div>
          <div className="flex justify-center items-center py-5 text-md lg:text-sm">
            <div>
              Already have an account,{" "}
              <span
                onClick={() => {
                  toggleForgpass(false);
                  toggleLogin(true);
                }}
                className="text-brand-main cursor-pointer"
              >
                login
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Forgpass;
