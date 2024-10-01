import {
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
  Fragment,
} from "react";
import { ArrowUpIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { IconFileTypePdf, IconPdf, IconPhotoPlus } from "@tabler/icons-react";
import { uploadFileToS3 } from "@/utils/uploadFileToS3";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from '@mantine/core';
import '@mantine/core/styles.css';
import { notifyError } from "@/utils/alert";

export default function ChatInput({
  isAiTyping,
  query,
  setQuery,
  queryImage,
  setQueryImage,
  selectedPdf,
  setSelectedPdf,
  enterEvent,
  uploading,
  setUploading,
  setFileList,
  show,
  filesList,
  setFile,
  showImage,
  setShowImages,
}: {
  isAiTyping: boolean;
  setQuery: (query: string) => void;
  query: string;
  queryImage: string[];
  setQueryImage: (queryImage: string[]) => void;
  selectedPdf: string | null;
  setSelectedPdf: (selectedPdf: string | null) => void;
  enterEvent: (event: any) => void;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
  show: boolean;
  setFileList: (files: File[]) => void;
  filesList: File[];
  setFile: (file: File) => void;
  showImage: string[];
  setShowImages: (showImages: string[]) => void;
}) {
  // This effect runs once on the initial mount to adjust the height to the initial content.
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Listen for "Enter" key
      if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
          event.preventDefault();
          if (!uploading && !isAiTyping) {
            enterEvent(event);
          }
      }
    },
    [query]
  );

  return (
    <div
      className="flex items-center max-md:items-center h-full rounded-[30px] max-md:rounded-3xl shadow-lg shadow-gpt-green-dark/10 duration-300 transition-all border-2 border-transparent  hover:border-[#50B887] hover:border-2 bg-white relative"
    // data-aos="fade-down"
    >
      <div className="h-full grow overflow-y-auto  p-2.5 max-md:p-2.5 transition-all duration-300 ease-linear relative top-[0.1px] max-md:top-[-0.4px]">
        {filesList && filesList?.length > 0 && (
          <>
            <div className="pb-5 pt-3 max-md:py-2">
              <div className="flex gap-4 items-center">
                {filesList?.map((image, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="relative h-28 max-md:h-16 w-28 max-md:w-16 ">
                        {image.type === "application/pdf" ? <object
                          type="application/pdf"
                          data={URL.createObjectURL(image)}
                          className="h-28 max-md:h-16 w-28 max-md:w-16 aspect-square rounded-md z-40"
                        ></object> : <img
                          src={URL.createObjectURL(image)}
                          alt="Selected"
                          className="h-28 max-md:h-16 w-28 max-md:w-16 aspect-square rounded-md z-40"
                        // onLoad={() => setUploading(false)}
                        />}


                        <XCircleIcon
                          className="absolute right-1 top-1 z-50 h-6 w-6 max-md:h-4 max-md:w-4 max-md:text-black text-black/60 cursor-pointer"
                          // onClick={() => queryImage && setQueryImage(null)}
                          onClick={(prev) => {
                            const newFiles = filesList.filter(
                              (img, i) => i !== index
                            );
                            const newShowImage = showImage.filter(
                              (img, i) => i !== index
                            );

                            setFileList(newFiles);
                            setShowImages(newShowImage);
                          }}
                          aria-details="Remove image"
                        />
                        {uploading && index === filesList.length - 1
                          && (
                            <>
                              <div className="z-40 right-0 top-0 absolute bg-gray-100 w-full h-full flex justify-center items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent"></div>{" "}
                              </div>
                            </>
                          )}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <div className="relative w-full">
          <div className="absolute top-1 -left-0.5 max-md:left-0.5  block">
            <Sparkles size={20} className="fill-[#828282] text-[#828282]" />
          </div>
          <div className="max-md:hidden block">
            <Textarea
              value={query}
              autosize
              autoFocus
              minRows={1}
              onChange={({ currentTarget }) => setQuery(currentTarget.value)}
              onKeyDown={handleKeyDown}
              placeholder="Start entering your symptom or health question..."
              className="max-h-[300px]  overflow-y-auto max-md:text-xs  font-alpina-condensed max-sm:px-1 max-sm:py-0.5 text-sm sm:text-lg align-middle whitespace-pre-wrap rounded-[30px]  bg-white text-gpt-green-dark placeholder:text-gpt-green-dark/40 placeholder:max-md:text-sm w-full px-2 sm:px-7 outline-none border-none"
            />
          </div>

          <div className="hidden max-md:block">
            <textarea
              autoFocus
              id="autosize-textarea"
              rows={query.length < 60 ? 1 : query.length < 120 ? 2 : query.length < 180 ? 3 : query.length < 240 ? 4 : query.length < 300 ? 6 : 8}
              ref={textAreaRef}
              value={query}
              onKeyDown={handleKeyDown}
              disabled={uploading}
              onChange={({ currentTarget }) => setQuery(currentTarget.value)}
              placeholder="Medical Question?"
              style={{ height: "auto" }}
              className="max-h-[140px]  overflow-y-auto max-md:text-xs resize font-alpina-condensed max-sm:px-1 max-sm:pl-8 max-sm:py-0.5 text-sm sm:text-lg align-middle whitespace-pre-wrap rounded-[30px] outline-none bg-white text-gpt-green-dark placeholder:text-gpt-green-dark/40 w-full px-2 sm:px-6 "
            />
          </div>
        </div>
      </div>

      {/* {selectedPdf && (
        <>
          <div className="flex absolute max-sm:hidden justify-center items-center gap-x-2 bg-white p-2 rounded-md min-w-fit right-4 -top-[60px] z-40">
            <IconPdf className="h-8 w-8" />
            {uploading ? (
              <div className="flex max-w-xl w-full truncate gap-2">
                <div className="animate-spin h-5 w-5 rounded-full border-4 border-blue-300 border-t-transparent"></div>
                Uploading...
              </div>
            ) : (
              <p className="max-w-xl w-full truncate">
                {selectedPdf.split("/").pop()?.slice(13)}
              </p>
            )}
          </div>

          <XCircleIcon
            className="absolute right-2 -top-[72px] z-50 h-6 w-6 text-red-600 cursor-pointer"
            onClick={() => {
              selectedPdf && setSelectedPdf(null);
            }}
          />
        </>
      )} */}

      <div className="flex justify-center gap-2 items-center rounded-r-full px-2 sm:px-3 bg-gradient-to-l from-white via-white to-white/90 h-full">
        <div className="h-fit w-fit relative">
          <label
            htmlFor="imageUpload"
            title="Upload an image"
            className="outline-0 cursor-pointer flex border rounded-full p-1 sm:p-1.5 bg-transparent border-gpt-green-dark/30 text-gpt-green-dark/80 hover:text-gpt-green-dark hover:border-gpt-green-dark transition-all duration-300 shrink-0 relative"
          >
            <IconPhotoPlus className={cn("h-5 w-5",
              uploading && "opacity-60")} />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/jpeg, image/png, application/pdf, image/tiff"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;

              if (file) {
                const supportedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/tiff'];
                if (supportedTypes.includes(file.type)) {
                  setFile(file);
                } else {
                  // File is not supported
                  // Here you can notify the user that the file type is unsupported
                  notifyError('Unsupported file type. Please select a JPEG, PNG, PDF, or TIFF file.'); // Example notification
                  // Optionally, reset the file input
                  e.target.value = ''; // This will clear the selected file
                }
              }
            }}
            className="sr-only"
          // multiple
          />
          <div className="transition-all duration-300 ease-linear">
            {open && <UploadImagePopOver open={open} setOpen={setOpen} />}
            {/* <UploadImagePopOver open={open} setOpen={setOpen} /> */}
          </div>
        </div>

        <button
          type="submit"
          className="outline-0 border-0 rounded-full p-1.5 sm:p-2 bg-gpt-green-dark hover:bg-[#50B887] text-white disabled:bg-gpt-green-dark/30 disabled:hover:bg-gpt-green-dark/30 transition-all duration-300"
          disabled={uploading || isAiTyping}
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

const UploadImagePopOver = ({ open, setOpen }: any) => {
  return (
    <>
      <div className="absolute top-[-140px] max-md:top-[-116px] right-[-120px] max-md:right-[-48px] w-72 max-md:w-56 h-28  z-50 ">
        <div className=" relative ">
          <div className="relative transform shadow-sm rounded-lg overflow-hidden  p-4 bg-white text-left transition-all md:my-0  md:max-w-lg md:p-4">
            <div className=" relative">
              <button
                title="Close"
                type="button"
                onClick={() => setOpen(false)}
                className="outline-none absolute right-1 max-md:right-0 leading-[0.6] -mt-1 text-2xl max-md:text-xl text-neutral-700 duration-300 transition-colors hover:text-neutral-900 font-light"
              >
                &times;
              </button>

              <p className="mb-0.5 text-start text-base max-md:text-xs">
                Don{"’"}t forget you can always <br /> upload test results here
              </p>
              <span
                className="mt-1.5 text-brand-main font-light text-sm max-md:text-xs cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Ok, got it!
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center max-md:justify-end max-md:relative max-md:right-12 z-[100] relative ">
            <svg
              width="27"
              height="12"
              viewBox="0 0 27 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 12L26.0574 0H0.942632L13.5 12Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
