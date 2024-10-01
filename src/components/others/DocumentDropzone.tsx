import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  PDF_MIME_TYPE,
  IMAGE_MIME_TYPE,
  DropzoneFullScreenProps,
} from "@mantine/dropzone";

type Props = {
  setFile: (file: File) => void;
};

export default function DocumentDropzone({
  setFile,
  ...rest
}: Partial<DropzoneFullScreenProps> & Props) {
  return (
    <Dropzone.FullScreen
      rejectColor="red"
      acceptColor="green"
      onDrop={(files) => {
        if (files[0]) {
          setFile(files[0]);
        }
      }}
      accept={[...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE]}
      {...rest}
    >
      <div
        style={{ pointerEvents: "none" }}
        className="w-full h-[100vh] relative bg-gpt-green-dark/80 text-center text-white flex flex-col items-center justify-center"
      >
        <Dropzone.Accept>
          <IconUpload stroke={1.5} className="h-auto w-16 text-green-600" />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <IconX stroke={1.5} className="h-auto w-16 text-red-600" />
        </Dropzone.Reject>

        <Dropzone.Idle>
          <IconPhoto stroke={1.5} className="h-auto w-16 text-neutral-600" />
        </Dropzone.Idle>

        <div className="mt-3">
          <p className="text-xl">Drag images here</p>
          <p className="mt-2 text-xl">
            Attach as many files as you like, each file should not exceed 5mb
          </p>
        </div>
      </div>
    </Dropzone.FullScreen>
  );
}
