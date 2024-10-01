import { IconUpload } from "@tabler/icons-react";


/**
 * Renders a component for pre-chat file upload.
 *
 * @param {Object} setFile - A function that sets the selected file.
 * @return {JSX.Element} The rendered pre-chat file upload component.
 */
export default function PreChat({ setFile }: { setFile: (file: File) => void }) {
    return (
      <div className="w-full h-full flex">
        {/* For desktop */}
      
        {/* For mobile */}
        {/* <label
          htmlFor="fileUpload"
          className="flex md:hidden flex-col gap-8 justify-center p-8 items-center mx-auto mt-0 md:mt-24 w-full rounded-3xl border border-dashed border-gpt-green-dark/40 h-[212px] max-w-md"
        >
          <IconUpload className="h-auto w-20 text-gpt-green-dark stroke-1" />
          <div className="flex flex-col items-center justify-center gap-y-1 font-oracle w-fit text-center">
            <h3 className="font-normal text-gpt-green-dark text-xl md:text-2xl">
              Drop Your Test Results Here
            </h3>
  
            <p className="text-gpt-green-dark/70 text-base md:text-lg font-light">
              Simply take a photo or screenshot
            </p>
          </div>
        </label> */}
  
        <input
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          id="fileUpload"
          type="file"
          className="sr-only"
        />
      </div>
    );
  }
  