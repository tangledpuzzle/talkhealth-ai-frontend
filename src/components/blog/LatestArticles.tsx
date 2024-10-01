import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const LatestArticles = (
  { data }: { data: any[] }
) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-[#F4F9FF] flex justify-center w-full pb-32 max-md:pb-8">
      <div className="flex flex-col pt-16 max-md:pt-6 w-full min-w-[10rem] max-w-[100rem] px-5 sm:px-10">
        <div className="w-full md:mb-8 text-5xl max-md:text-center font-extrabold text-gray-800 max-md:max-w-full max-md:text-4xl">
          Latest articles
        </div>
        <div className="mt-6 w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <Link href={
              `/blog/${data[0]?._id || "ab"}`
            }
            
            className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow self-stretch px-3 pt-3 pb-7 w-full text-white bg-slate-800 rounded-[40px] max-md:rounded-[20px] max-md:mt-10 max-md:max-w-full">
                <div className="flex relative flex-col items-end   text-xl font-bold leading-7 whitespace-nowrap min-h-[340px] max-md:min-h-[220px] max-md:max-w-full">
                  <Image
                    src={ "/blog/article-1.png"}
                    width={680}
                    height={400}
                    className="object-cover  max-h-[440px] max-md:h-[240px] max-md:min-h-[220px] rounded-[30px] max-md:rounded-[20px]  w-full "
                    alt="article-1"
                  />
                  {/* <img src={ "/blog/article-1.png"} className="object-cover  max-h-[440px] max-md:h-[240px] max-md:min-h-[220px] rounded-[30px] max-md:rounded-[20px]  w-full " alt="article-1" /> */}
                  <div className="absolute top-5 max-md:text-sm max-md:font-medium right-5 justify-center px-3 py-2 bg-green-400 rounded-[30px] max-md:rounded-[20px]  ">
                    New
                  </div>
                </div>
                <div className="flex gap-4 justify-between self-start px-6 mt-6 text-lg leading-6 max-md:px-2">
                  <div className="flex gap-2">
                    <Image
                      loading="lazy"
                      alt="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed7552eb5793f5e90f0b03b570ce972205424b08caad603caeada20fef30dc20?"
                      className="shrink-0 self-start w-6 aspect-square"
                    />
                    <p
                    className="xxl:text-xl md:text-lg text-sm"
                    >
                      {/* {formatDate(data[0]?.createdAt) || ""} */}
                      {"20 March, 2024"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      loading="lazy"
                      alt="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/be42dd3d0436c9d26239715edbf94abdc640044024f4943494ea560074c1d1a2?"
                      className="shrink-0 self-start w-6 aspect-square"
                    />
                    <p  className="xxl:text-xl md:text-lg text-sm">15 minutes read</p>
                  </div>
                </div>
                <div className="mt-4  xxl:text-3xl md:text-xl text-base font-medium leading-9 max-md:max-w-full px-6 max-md:px-2">
              {/* {
                data[0]?.title || " "
              } */}
              
                Revolutionizing healthcare: the transformative 
                power of AI
              
                </div>
              </div>
            </Link>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex max-md:hidden flex-col gap-10 grow self-stretch max-md:mt-10 max-md:max-w-full">
              <SmallArticle 
              text="AI in healthcare: revolutionizing diagnosis and treatment"
              image="/blog/latest-s-1.png"
              />
                <SmallArticle  text="The future of diagnosis: AI's role in medical imaging"
              image="/blog/latest-s-2.png" />
                <SmallArticle   text="Harnessing AI for personalized medicine: a promising frontier"
              image="/blog/latest-s-3.png"/>
              </div>
              <div className={cn("hidden max-md:block max-md:mt-10",)}
                // data?.length > 1 ? "" : "hidden")}
              >
                <div>
                <Carousel setApi={setApi}>
                  <CarouselContent
                  className="xs:max-w-[350px] max-w-[350px]"
                  >
                     <CarouselItem
                    className=""
                    >
                      <SmallArticle  text="AI in healthcare: revolutionizing diagnosis and treatment"
              image="/blog/latest-s-1.png" />
                    </CarouselItem>
                    <CarouselItem>
                      <SmallArticle text="The future of diagnosis: AI's role in medical imaging"
              image="/blog/latest-s-2.png" />
                    </CarouselItem>
                    <CarouselItem>
                      <SmallArticle text="Harnessing AI for personalized medicine: a promising frontier"
              image="/blog/latest-s-3.png"/>
                    </CarouselItem>
                    <CarouselItem>
                      <SmallArticle  text="AI in healthcare: revolutionizing diagnosis and treatment"
              image="/blog/latest-s-1.png"/>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
                </div>
                <div className="py-6 flex justify-between gap-5 w-[75%] mx-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(" h-12 w-12 rounded-full")}
                    disabled={current === 1}
                    onClick={() => api?.scrollPrev()}
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Prevoius slide</span>
                  </Button>

                  <div
                  className="flex gap-3 items-center justify-center transition-all duration-300 ease-in-out"
                  >
                    {
                      Array.from({ length: count }).map((_, i) => (
                        <div
                        key={i}
                        className={cn(
                          " rounded-full transition-all duration-300 ease-in-out",
                          current === i + 1
                          ? "bg-[#2D2D3E] w-4 h-4"
                          : "bg-white w-2 h-2"
                        )}
                        />
                      ))
                    }

                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(" h-12 w-12 rounded-full")}
                    disabled={
                      api?.canScrollNext() === false 
                    }
                    onClick={() => api?.scrollNext()}
                  >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next slide</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;

const SmallArticle = (
  // { item }: { item?: any }
  {text,image}: {text:string,image:string}
) => {
  return (
    <Link href={`/blog/${ "ab"}`}
    className="cursor-pointer"
    >
      <div className="p-4 bg-white rounded-[30px] max-md:rounded-[20px]  max-md:max-w-full">
        <div className="flex gap-5  max-md:gap-0 max-md:flex-col-reverse">
          <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch pr-3 my-auto max-md:mt-8 max-md:max-w-full">
              <div className="flex gap-4 justify-between  leading-6 text-zinc-500 ">
                <div className="flex gap-1">
                  <Image
                    loading="lazy"
                    alt="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc34ba3c2fe180b8483d0ae509baadc8f0b2f2546422efabcaf6931624b385cd?"
                    className="shrink-0 self-start w-6 aspect-square"
                  />
                  <p className="xxl:text-xl md:text-lg text-sm">
                    {/* {formatDate(item.createdAt) || " "} */}
                    {"20 March, 2024"}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Image
                    loading="lazy"
                    alt="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8708cbff302f9e528806943fa34c349559acbfa3a12ee0a84baf7dd01a3404d?"
                    className="shrink-0 self-start w-6 aspect-square"
                  />
                  <p className="xxl:text-xl md:text-lg text-sm">
                    15 minutes read
                  </p>
                </div>
              </div>
              <div className="mt-4 xxl:text-2xl md:text-xl text-base font-medium leading-8 text-gray-800 max-md:max-w-full">
               {/* {
                item.title || " "
               } */}
               {
               text
               }
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
            <Image
              src={image}
              // src={item.cover || "/blog/article-1.png"}
              width={240}
              height={180}
              className="grow self-stretch w-full aspect-[1.37] "
              alt="article-1"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

function formatDate(date:any) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  // @ts-ignore
  return new Date(date).toLocaleDateString('en-GB', options);
}