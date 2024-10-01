import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function ProfileLayout({
  page,
  children,
}: {
  page?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start md:px-10 md:bg-gpt-subtle bg-gpt-green-dark/30">
      <div
        className={`w-full flex items-center relative md:border-b-0 border-b border-gpt-green-dark/5 rounded-t-3xl md:rounded-none bg-gpt-subtle px-5 md:px-0 mt-3 md:mt-0
        ${page ? "py-6" : "py-5"}`}
      >
        <button
          title="Back to profile"
          onClick={() => router.push("/profile")}
          className={`p-2 rounded-full shrink-0 bg-black/5 hover:bg-black/10
          ${page && "absolute"}`}
        >
          <ArrowLeftIcon className="h-5 w-5 text-neutral-800" />
        </button>

        {page && (
          <h3 className="mx-auto font-normal font-oracle text-lg md:text-xl text-gpt-green-dark/90">
            {page}
          </h3>
        )}
      </div>

      <div className="overflow-y-auto overflow-x-hidden bg-gpt-subtle flex-grow">
        {children}
      </div>
    </div>
  );
}
