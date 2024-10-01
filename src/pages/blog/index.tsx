import Nav from "@/layouts/main/nav";
import React,{useState,useEffect} from "react";
import { Manrope } from "next/font/google";
import LatestArticles from "@/components/blog/LatestArticles";
import TopArticles from "@/components/blog/TopArticles";
import RecommendToRead from "@/components/blog/RecommendToRead";
import Footer from "@/layouts/main/footer";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import NavModal from "@/layouts/main/nav-modal";

const manrope = Manrope({ subsets: ["latin"] });

const BlogPage = () => {
  const [data, setData] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/articles");
      setData(res.data);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    // fetchBlogs();
  }, []);
  

  return (
    <>
      <div
        className={`h-full flex flex-col bg-[#F4F9FF] bg-brand-main-gradient ${manrope.className}`}
      >
        <Nav />

        <main className="h-fit flex flex-col items-center justify-center">
          <div className="flex overflow-hidden relative flex-col self-stretch px-20 py-20 w-full min-h-[450px] max-md:min-h-[160px] max-md:px-5 max-md:py-4 max-md:max-w-full">
            <Image
              src="/blog/blog-bg-header.png"
              className="object-cover absolute inset-0 size-full"
              alt="bg-header"
              layout="fill"
            />
            <div className="relative self-start text-xl max-md:text-xs max-xl:text-base font-medium leading-7 text-white max-md:max-w-full">
              <Link href="/main" className="text-neutral-400">
                Home /
              </Link>{" "}
              Blog
            </div>
            <div className="relative self-center mt-28 mb-16 max-md:mt-10 max-md:mb-12 text-7xl font-extrabold text-white max-md:my-10 max-md:text-4xl">
              Our blog
            </div>
          </div>

          <LatestArticles data={data}/>
          <TopArticles data={data} />
          <RecommendToRead data={data} />
        </main>
        <NavModal />
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
