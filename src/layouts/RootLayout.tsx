import React, { useState } from "react";
import Head from "next/head";
import Sidebar from "@/components/others/Sidebar";


/**
 * Props for the RootLayout component
 */
interface LayoutProps {
  /**
   * Metadata for the page
   */
  metadata?: {
    title: string;
    description?: string;
  };
  /**
   * The content to be rendered within the layout
   */
  children?: React.ReactNode;
  page?: "Profile" | "Discover" | "History";
}

/**
 * RootLayout component provides a consistent layout for the application.
 * It includes a dynamic title, header, body, and footer.
 *
 * @param {LayoutProps} props - The props for the RootLayout component
 * @returns {JSX.Element} - The rendered RootLayout component
 */
export default function RootLayout({
  page,
  metadata,
  children,
}: LayoutProps): JSX.Element {

  return (
    // Main container with flex layout
    <div className="h-[100svh] md:overflow-hidden w-full relative flex justify-start items-start">
      {/* Dynamic page title */}
      <Head>
        <title>
          {metadata?.title ? `${metadata.title} | TalkHealthAI` : "TalkHealthAI"}
        </title>
      </Head>

      {/* App sidebar */}
      <Sidebar page={page} />
      {/* App body */}
      <div className="w-full h-full flex-grow flex">{children}</div>
    </div>
  );
}
