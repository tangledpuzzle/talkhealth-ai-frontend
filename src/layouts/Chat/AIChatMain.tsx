import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Components } from "react-markdown"; // Used to type components prop (v8.x.x+)
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";

interface AIChatProps {
  message: string;
  animate?: boolean;
  loading: boolean;
  handleSuggestionClicked: (suggestion: string) => void;
}

const manrope = Manrope({ subsets: ["latin"] });

const QuestionComponent: React.FC<{
  children: React.ReactNode;
  question: string;
  onClick: (suggestion: string) => void;
}> = ({ children, question, onClick }) => {
  return (
    <p
      onClick={() => onClick(question)}
      className="text-[#082630] cursor-pointer font-semibold my-2"
    >
      {children}
    </p>
  );
};

export default function AIChatMain({
  message,
  loading,
  animate,
  handleSuggestionClicked, // Add this prop to use the function
}: AIChatProps) {
  // Define your ReactMarkdown components
  const components: Components = {
    // Custom renderer for 'question' in markdown
    //@ts-ignore
    question: ({
      node,
      children,
    }: {
      node: any;
      children: React.ReactNode;
    }) => {
      const childText = children ? children.toString() : "";
      return (
        <QuestionComponent
          question={childText}
          onClick={handleSuggestionClicked}
        >
          {children}
        </QuestionComponent>
      );
    },
    a: ({node, ...props}) => {
      return <a {...props} target="_blank" aria-label="Merck Manual" className="font-semibold">{props.children} &gt;&gt; Merck Manual</a>
    },
  };

  if (loading) {
    return <div className="text-lg ml-4 md:text-2xl mr-auto dot-elastic" />;
  }

  return (
    <>
      <div className="flex gap-3">
        <div className="w-[6%] pt-1 mt-2 h-16 max-sm:w-8 max-sm:h-8">
          <img
            src={"/small_logo.png"}
            className="flex w-10 h-10 max-sm:w-8 max-sm:h-8"
            alt="AI"
          />
        </div>

        <div
          className={cn(
            "w-full text-[#212131] max-sm:text-sm",
            manrope.className
          )}
        >
          {/* @ts-ignore */}
          <ReactMarkdown className="prose" components={components} rehypePlugins={[rehypeRaw]} >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}
