import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { sendFeedback } from "../../utils/api";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Rating } from "@mantine/core";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import '@mantine/core/styles.css';
import { capitalizeFirstLetter } from "@/utils/utils";


export default function FeedbackForm({ children, className }: any) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await sendFeedback(rating, feedback);
    if (res) {
      setFeedbackSubmitted(true);
      setLoading(false);
    } else {
      setOpen(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    setFeedbackSubmitted(false);
    setRating(1);
  }, [open]);

  className = clsx("w-fit h-fit max-md:w-full", className);

  return (
    <>
      <div onClick={() => setOpen(true)} className={className}>
        {children}
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            leaveTo="opacity-0"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leave="ease-in duration-200"
            enter="ease-out duration-300"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0">
              <Transition.Child
                as={Fragment}
                leave="ease-in duration-200"
                enter="ease-out duration-300"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gpt-subtle p-4 text-left shadow-xl transition-all md:my-8 w-full md:max-w-lg md:p-6">
                  {/* <Form
                    open={open}
                    setOpen={setOpen}
                    handleSubmit={handleSubmit}
                    feedback={feedback}
                    setFeedback={setFeedback}
                  /> */}
                  {/* <ThankYou open={open} setOpen={setOpen} /> */}
                  {feedbackSubmitted ? (
                    <ThankYou open={open} setOpen={setOpen} />
                  ) : (
                    <Form
                      open={open}
                      setOpen={setOpen}
                      handleSubmit={handleSubmit}
                      feedback={feedback}
                      setFeedback={setFeedback}
                      rating={rating}
                      setRating={setRating}
                      loading={loading}
                    />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

const Form = ({
  open,
  setOpen,
  handleSubmit,
  feedback,
  setFeedback,
  rating,
  setRating,
  loading
}: any) => {
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("fullName")
    ) {
      setFullName(localStorage.getItem("fullName") as string);
    } else {
      setFullName("");
    }
  }, []);
  return (
    <>
      <div className="mt-2 relative">
        <button
          title="Close"
          type="button"
          onClick={() => setOpen(false)}
          className="outline-none absolute right-3 leading-[0.6] -mt-1 text-3xl text-neutral-700 duration-300 transition-colors hover:text-neutral-900 font-light"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center ">Hi, {
          capitalizeFirstLetter(fullName.split(" ")[0])
        }!</h2>
      </div>
      <div>
        <h4 className="mt-5 text-lg font-semibold text-center">
          How would you rate our app?
        </h4>
        <div className="flex justify-center my-3">
          <div className="flex gap-1">
            <Rating defaultValue={1} size="lg"
              value={rating}
              onChange={setRating}
            />
          </div>
        </div>
        <h4 className="mb-8 mt-4 text-lg font-semibold text-center">
          Please tell us how was your experience?
        </h4>
      </div>
      <div className="flex justify-between items-center w-full font-oracle ">
        <p className="text-base">Your feedback</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-y-6 w-full mt-2"
      >
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write a feedback here"
          rows={4}
          className="outline-none border rounded-xl border-gpt-green-dark/20 bg-transparent focus:border-gpt-green-dark/40 font-oracle text-gpt-green-dark font-normal p-3 resize-none"
          autoFocus
        // required
        />

        <div className="w-full flex">
          <Button className="w-full rounded-full text-md lg:text-base bg-brand-main h-15 py-4 lg:h-13 lg:py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Send feedback
          </Button>
        </div>
      </form>
    </>
  );
};

const ThankYou = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <div className="mt-2 relative">
        <button
          title="Close"
          type="button"
          onClick={() => setOpen(false)}
          className="outline-none absolute right-3 leading-[0.6] -mt-1 text-3xl text-neutral-700 duration-300 transition-colors hover:text-neutral-900 font-light"
        >
          &times;
        </button>
        <div className="flex justify-center mb-4">
          <svg
            width="100"
            height="91"
            viewBox="0 0 100 91"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M64.2773 27.4323L44.8687 46.842L35.7211 37.7018C35.0979 37.0805 34.087 37.0796 33.4637 37.7029C32.8414 38.3261 32.8414 39.337 33.4647 39.9604L43.7415 50.2277C44.0532 50.5384 44.4614 50.6942 44.8697 50.6942C45.278 50.6942 45.6863 50.5384 45.998 50.2268L66.5338 29.6888C67.1571 29.0655 67.1571 28.0556 66.5338 27.4323C65.9105 26.809 64.9006 26.809 64.2773 27.4323Z"
              fill="#50B887"
            />
            <path
              d="M86.4444 0.978516H13.2231C5.51445 0.978516 0 7.44873 0 15.1573V57.8716C0 65.4503 5.64328 72.2551 13.2231 72.2551H36.1702V88.3809C36.1702 88.9647 36.4601 89.4987 36.9826 89.7595C37.2008 89.8696 37.4169 89.9226 37.6517 89.9226C37.98 89.9226 38.2948 90.1366 38.568 89.935L62.5499 72.2551H86.4445C93.8943 72.2551 100 65.3215 100 57.8716V15.1573C100 7.57649 94.0222 0.978516 86.4444 0.978516ZM96.8085 57.8716C96.8085 63.6499 92.2228 69.0636 86.4444 69.0636H62.0345C61.7021 69.0636 61.4715 68.9067 61.2055 69.1062L39.3617 85.2975V70.0734C39.3617 69.2226 38.4838 69.0636 37.6319 69.0636H13.2231C7.34285 69.0636 3.19149 63.7497 3.19149 57.8716V15.1573C3.19149 9.17745 7.24423 4.17 13.2231 4.17H86.4444C92.3225 4.17 96.8085 9.27724 96.8085 15.1573V57.8716Z"
              fill="#50B887"
            />
            <path
              d="M17.6976 8.55232C14.7877 8.17519 11.9827 9.17881 9.79687 11.3865C7.25153 13.9567 5.97472 17.7309 6.4661 21.2383C6.57419 22.0082 7.23387 22.565 7.99015 22.565C8.06185 22.565 8.13355 22.5598 8.20525 22.5504C9.04887 22.4331 9.63685 21.6529 9.51844 20.8103C9.16312 18.2754 10.1334 15.4277 11.9868 13.5556C13.4808 12.0483 15.3654 11.3584 17.2997 11.6098C18.1412 11.7189 18.9163 11.1257 19.0274 10.281C19.1376 9.43647 18.5423 8.66243 17.6976 8.55232Z"
              fill="#50B887"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-center ">Thank you!</h2>
        <h4 className="mb-8 mt-4 text-lg font-semibold text-center">
          Your feedback is very helpful to us
        </h4>
        <div className="flex justify-center">
          <span className="text-brand-main border-2 text py-4 px-5 w-fit text-base mb-4 border-brand-main hover:bg-brand-main hover:text-white border-solid rounded-full cursor-pointer font-semibold"
            onClick={() => setOpen(false)}
          >
            Return to the app
          </span>
        </div>
      </div>
    </>
  );
};
