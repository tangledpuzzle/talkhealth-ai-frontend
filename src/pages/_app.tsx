import "@/styles/globals.css";
import "@mantine/dropzone/styles.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@/layouts/main/blog/coursel.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { ChatProvider } from "@/context/Chat.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protect from "@/context/Protect";
import axios from "axios";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await axios.get("/api/timeout");
        if (token.status === 200) {
          // console.log("Token is valid");
        }
      } catch (error: any) {
        if(error?.response.status === 401){
          localStorage.removeItem("accessToken");
          localStorage.removeItem("fullName");
          localStorage.removeItem("email");
          localStorage.removeItem("uid");
          router.push("/main");
        }
      }
    };
    checkToken();
  }, []);
  return (
    <MantineProvider>
      <ChatProvider>
        <Protect>
          <ToastContainer style={{ fontSize: "0.8em" }} />
          <Component {...pageProps} />
        </Protect>
      </ChatProvider>
    </MantineProvider>
  );
}
