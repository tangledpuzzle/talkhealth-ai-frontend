import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Sparkles } from "lucide-react";

const UpgradeModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
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
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end max-md:items-center justify-center p-4 text-center md:items-center md:p-0">
              <Transition.Child
                as={Fragment}
                leave="ease-in duration-200"
                enter="ease-out duration-300"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-gpt-subtle p-4 py-8 text-left shadow-xl transition-all md:my-8 w-full md:max-w-lg md:p-6">
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
                      {/* <Trash2 size={64} className="text-[#50B887]" /> */}
                      <Rocket />
                    </div>
                    <h2 className="text-3xl font-bold pb-6 pt-2 max-md:text-xl max-md:font-semibold text-center ">
                      Upgrade your plan
                    </h2>
                    <p className=" px-5 sm:px-[3%] text-center lg:px-4 text-lg max-md:text-base">
                      You can ask only <span className="font-bold">3</span> of
                      your <span className="font-bold">medical questions.</span>{" "}
                      To continue freely using our application you need to
                      upgrade your plan
                    </p>
                    <p className="font-light text-center text-lg max-md:text-base px-5 sm:px-[3%] lg:px-4 text-[#444444] my-5">
                      USD $20/month{" "}
                    </p>
                    <div className="flex w-full cursor-pointer rounded-full justify-center py-4 text-white bg-brand-main ">
                      <Sparkles className="h-6 w-6 mr-2 fill-white" />{" "}
                      <span className="text-lg max-md:text-base font-semibold">
                        Upgrade
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UpgradeModal;

const Rocket = () => {
  return (
    <>
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M62.0071 17.9273C58.867 14.9451 53.6078 14.9652 50.6121 17.9911C47.5392 21.0909 47.5526 26.2024 50.6759 29.4265C52.2241 30.9075 54.2492 31.727 56.3785 31.727C58.5379 31.727 60.5563 30.8908 62.0676 29.3694C65.1842 26.2091 65.1741 21.2018 62.0071 17.9273ZM60.1634 27.4719C59.1592 28.4828 57.8159 29.0369 56.3785 29.0369C54.9444 29.0369 53.5776 28.4861 52.5667 27.5189C50.4912 25.3729 50.471 21.9473 52.5197 19.8819C53.5205 18.871 54.8605 18.3169 56.2945 18.3169C57.7285 18.3169 59.0954 18.8677 60.113 19.8349C62.2187 22.0111 62.2389 25.3695 60.1634 27.4719Z"
          fill="#50B887"
        />
        <path
          d="M79.5127 0.50376C79.4959 0.48361 79.4791 0.466818 79.4623 0.446667C79.0325 0.0201504 78.5186 0 77.6387 0C76.9402 0 70.623 0.0705265 63.5032 2.65985C63.4999 2.65985 63.4999 2.66321 63.4965 2.66321C47.6482 8.40608 36.5722 21.8867 31.1954 29.7554C28.4281 30.0946 20.9792 30.4909 20.8986 30.4943C20.5358 30.5178 20.1966 30.679 19.9582 30.9544L8.62024 43.9144C8.22731 44.3645 8.17693 45.016 8.49598 45.5198C8.81503 46.0235 9.41283 46.2485 10.0005 46.094L21.8557 42.7054L22.9808 43.1454C22.8229 43.4107 22.655 43.6861 22.4904 43.9682C21.8792 44.9958 21.2411 46.0571 20.9153 46.6482C20.9153 46.6515 20.912 46.6515 20.912 46.6549C20.3914 47.5885 19.9078 48.502 19.4511 49.3718C19.1791 49.8924 19.2764 50.5338 19.6929 50.9503L29.0695 60.3303C29.3281 60.5889 29.6741 60.7266 30.0233 60.7266C30.2349 60.7266 30.4498 60.6729 30.648 60.5721C31.5178 60.1154 32.4279 59.6318 33.3683 59.1078C33.3683 59.1078 33.3683 59.1078 33.3717 59.1045C33.9527 58.7787 35.0038 58.1541 36.0281 57.5428C36.317 57.3716 36.6058 57.1969 36.8778 57.0391L37.3178 58.1608L33.9291 70.0159C33.7646 70.5902 33.9997 71.2048 34.5034 71.5205C34.7217 71.6616 34.9736 71.7321 35.2221 71.7321C35.5412 71.7321 35.8535 71.6179 36.1087 71.3962L49.0655 60.0583C49.3375 59.8198 49.5021 59.4806 49.5222 59.1213C49.5256 59.0407 49.9218 51.5917 50.261 48.8244C58.1331 43.4476 71.6138 32.3716 77.36 16.5166C79.6538 10.2095 80.6344 1.62211 79.5698 0.557494C79.5463 0.537344 79.5295 0.520552 79.5127 0.50376ZM77.3264 2.69008C77.2962 4.51705 76.9771 8.7352 75.5095 13.5545L66.4586 4.50697C71.6675 2.92853 76.0569 2.71695 77.3264 2.69008ZM22.4199 40.0388C22.1479 39.9314 21.8423 39.9213 21.5568 39.9952L13.6411 42.2588L21.6105 33.1508C23.011 33.0735 26.6481 32.8619 29.3919 32.6302C27.874 35.0886 25.5432 38.8701 24.3711 40.8046L22.4199 40.0388ZM30.2752 57.7242L22.2889 49.7379C22.5979 49.1569 22.9203 48.5625 23.2562 47.958C23.2562 47.958 23.2562 47.9546 23.2562 47.9512C23.2763 47.9143 23.32 47.8404 23.3435 47.8001L32.213 56.6663C32.1693 56.6932 32.0921 56.7368 32.0518 56.7603C31.4506 57.0962 30.8562 57.4186 30.2752 57.7242ZM37.7611 66.3721L40.0246 58.4597C40.1052 58.1742 40.0918 57.872 39.981 57.5966L39.2119 55.6353L47.3863 50.6145C47.1545 53.3583 46.9429 57.0021 46.8657 58.4059L37.7611 66.3721ZM48.2594 46.9269L36.8677 53.9258C36.3438 54.2247 35.511 54.7218 34.6546 55.2323C34.6411 55.2423 34.6277 55.249 34.6143 55.2558L24.7641 45.4089C24.7775 45.3854 24.7909 45.3653 24.8044 45.3418C25.3081 44.4921 25.8018 43.6659 26.0974 43.1487C26.0974 43.1487 26.1007 43.1487 26.1007 43.1454C27.0646 41.5031 32.7604 32.2877 33.0895 31.757C33.0895 31.7537 33.0929 31.7537 33.0929 31.7537C38.0633 24.3652 48.6087 11.2876 63.6644 5.51785L74.5053 16.3554C68.7255 31.4111 55.6479 41.9565 48.2594 46.9269Z"
          fill="#50B887"
        />
        <path
          d="M19.3953 54.9264C19.0595 54.2581 18.2434 53.9928 17.5952 54.3186L0.74615 62.6911C0.0811864 63.0235 -0.187486 63.8296 0.138279 64.4912C0.373367 64.9647 0.85026 65.2401 1.34059 65.2401C1.54545 65.2401 1.74695 65.1931 1.93838 65.099L18.7875 56.7265C19.4558 56.3974 19.7245 55.588 19.3953 54.9264Z"
          fill="#50B887"
        />
        <path
          d="M19.3275 59.6531C18.8976 59.0452 18.0648 58.9075 17.4535 59.3341L6.94173 66.783C6.33722 67.2129 6.19281 68.0491 6.62268 68.657C6.88464 69.0264 7.29772 69.2246 7.71752 69.2246C7.98619 69.2246 8.25822 69.144 8.49331 68.976L19.0051 61.5271C19.613 61.0972 19.7574 60.261 19.3275 59.6531Z"
          fill="#50B887"
        />
        <path
          d="M19.0863 64.3C18.475 63.8769 17.6422 64.0146 17.2123 64.6258L8.73903 76.6757C8.31252 77.2836 8.45693 78.1232 9.0648 78.5497C9.29989 78.7143 9.56856 78.7949 9.83723 78.7949C10.257 78.7949 10.6735 78.5934 10.9354 78.224L19.4087 66.174C19.8385 65.5661 19.6941 64.7265 19.0863 64.3Z"
          fill="#50B887"
        />
        <path
          d="M25.5174 61.3491C24.8659 60.9931 24.0498 61.2383 23.6971 61.8898L14.9922 77.9766C14.6395 78.6281 14.8813 79.4475 15.5329 79.7968C15.7377 79.9076 15.956 79.9614 16.171 79.9614C16.6478 79.9614 17.1079 79.7061 17.3531 79.2561L26.0581 63.1694C26.4141 62.5178 26.1723 61.7017 25.5174 61.3491Z"
          fill="#50B887"
        />
      </svg>
    </>
  );
};
