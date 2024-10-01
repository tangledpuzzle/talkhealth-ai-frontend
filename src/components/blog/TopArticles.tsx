import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Link from "next/link";

const TopArticles = (
  { data }: { data: any }
) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [api2, setApi2] = React.useState<CarouselApi>();
  const [apione, setApiOne] = React.useState<CarouselApi>();
  const [apiTwo, setApiTwo] = React.useState<CarouselApi>();
  const [api3, setApi3] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api || !api2 || !api3 || !apione) {
      return;
    }

    setCount(api.scrollSnapList().length);

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, api2]);

  const handleScroll = (direction: "prev" | "next") => {
    if (direction === "next") {
      api?.scrollNext();
      api2?.scrollNext();
    } else {
      api?.scrollPrev();
      api2?.scrollPrev();
    }
  };

  const handleMobileScroll = (direction: "prev" | "next") => {
    if (direction === "next") {
      apione?.scrollNext();
      apiTwo?.scrollNext();
      api3?.scrollNext();
    } else {
      apione?.scrollPrev();
      apiTwo?.scrollPrev();
      api3?.scrollPrev();
    }
  }

  return (
    <div>
      <div className="md:flex hidden  flex-col justify-center items-center bg-blue-50 py-24 max-md:py-8 w-full min-w-[10rem] max-w-[100rem] px-5 sm:px-10">
        <div className="flex gap-5 justify-between max-md:justify-center mt-12 w-full max-w-[1600px] max-md:mt-10 max-md:max-w-full">
          <div className="text-6xl md:mb-8 font-extrabold text-gray-800 max-md:text-4xl">
            Top articles
          </div>
          <div className="flex gap-4 my-auto max-md:hidden ">
            <Button
              variant="outline"
              size="icon"
              className={cn(" h-12 w-12 rounded-full")}
              disabled={current === 1}
              onClick={() => handleScroll("prev")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Prevoius slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(" h-12 w-12 rounded-full")}
              disabled={api?.canScrollNext() === false}
              onClick={() => handleScroll("next")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
        <div className="mt-9 w-full 2xl:max-w-[1600px] lg:max-w-[900px] md:max-w-[700px] max-md:max-w-full">
          {/* <div className="flex gap-8 max-md:flex-col max-md:gap-0"> */}
          <div>
            <Carousel setApi={setApi}>
              <CarouselContent>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard imageUrl="/blog/top-article-1.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-2.png"
                  text="AI in healthcare: revolutionizing diagnosis and treatment"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-3.png"
                  text="AI-assisted surgery: redefining precision and patient outcomes"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-4.png"
                  text="From data to diagnosis: AI's impact on clinical decision making"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-5.png"
                  text="AI and mental health: innovations in diagnosis and treatment"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          {/* </div> */}
        </div>
        <div className="mt-10 w-full 2xl:max-w-[1600px] lg:max-w-[900px] md:max-w-[700px] max-md:max-w-full">
          <div>
            <Carousel setApi={setApi2}>
              <CarouselContent>
              <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-4.png"
                  text="From data to diagnosis: AI's impact on clinical decision making"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-5.png"
                  text="AI and mental health: innovations in diagnosis and treatment"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-4.png"
                  text="From data to diagnosis: AI's impact on clinical decision making"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-5.png"
                  text="AI and mental health: innovations in diagnosis and treatment"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="md:hidden  flex-col justify-center items-center bg-blue-50 max-md:py-8 w-full min-w-[10rem] max-w-[100rem] px-5 sm:px-10">
        <div className="flex max-md:justify-center mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <div className=" md:mb-8 font-extrabold text-gray-800 max-md:text-4xl">
            Top articles
          </div>
        </div>
        <div className=" max-md:block max-md:mt-4">
          <div>
            <Carousel setApi={setApiOne}>
              <CarouselContent className="xs:max-w-[350px] max-w-[350px]">
                
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard imageUrl="/blog/top-article-1.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-2.png"
                  text="AI in healthcare: revolutionizing diagnosis and treatment"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-3.png"
                  text="AI-assisted surgery: redefining precision and patient outcomes"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-2.png"
                  text="AI in healthcare: revolutionizing diagnosis and treatment"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          <div>
            <Carousel setApi={setApiTwo}>
              <CarouselContent className="xs:max-w-[350px] max-w-[350px]">
              <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-4.png"
                  text="From data to diagnosis: AI's impact on clinical decision making"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-5.png"
                  text="AI and mental health: innovations in diagnosis and treatment"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          <div>
            <Carousel setApi={setApi3}>
              <CarouselContent className="xs:max-w-[350px] max-w-[350px]">
              <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
                <CarouselItem className="2xl:basis-[33%] md:basis-[50%]">
                  <TopArticleCard 
                  imageUrl="/blog/top-article-6.png"
                  text="The future of medicine: how AI is reshaping healthcare"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          <div className="py-6 flex justify-between gap-5 w-[75%] mx-auto">
            <Button
              variant="outline"
              size="icon"
              className={cn(" h-12 w-12 rounded-full")}
              disabled={
               apione?.canScrollPrev() === false  
              }
              onClick={
                () => handleMobileScroll("prev")
              }
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Prevoius slide</span>
            </Button>

            <div className="flex gap-3 items-center justify-center transition-all duration-300 ease-in-out">
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    " rounded-full transition-all duration-300 ease-in-out",
                    current === i + 1
                      ? "bg-[#2D2D3E] w-4 h-4"
                      : "bg-white w-2 h-2"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className={cn(" h-12 w-12 rounded-full")}
              disabled={apione?.canScrollNext() === false}
              onClick={
                () => handleMobileScroll("next")
              }
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TopArticles;

const TopArticleCard = (
  {text,imageUrl}: {text: string, imageUrl: string}
) => {
  return (
    <>
      <Link href={`/blog/${ "ab"}`}
    // className="cursor-pointer" 
    className="flex flex-col 2xl:w-full w-[80%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow px-3 pt-3 pb-6 w-full bg-white rounded-[40px] max-md:mt-10 max-md:max-w-full">
          {/* <img
                loading="lazy"
                srcSet="..."
                className="w-full aspect-[1.61] max-md:max-w-full"
              /> */}
          <Image
            src={imageUrl}
            width={480}
            height={300}
            className=""
            alt="small"
          />
          <div className="flex gap-4 justify-between px-3 mt-6 text-lg leading-6 text-zinc-500 max-md:flex-wrap max-md:mr-2.5">
            <div className="flex gap-1">
              <Image
                loading="lazy"
                alt="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/50d7b0d6a963ca240396d88c257cff3c235fa2d2ea41c53c7fc51ec261ad5c9e?"
                className="shrink-0 self-start w-6 aspect-square"
              />
              <div>11 March, 2024</div>
            </div>
            <div className="flex gap-1">
              <Image
                loading="lazy"
                alt="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9243352e0e99618100886b52185fd5e71fb5c136538cfca69a40f8a0865d8e6c?"
                className="shrink-0 self-start w-6 aspect-square"
              />
              <div>10 minutes read</div>
            </div>
          </div>
          <div className="mt-4 text-2xl font-medium leading-8 text-gray-800 max-md:mr-2.5 max-md:max-w-full">
            {text}
          </div>
        </div>
      </Link>
    </>
  );
};


function formatDate(date:any) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  // @ts-ignore
  return new Date(date).toLocaleDateString('en-GB', options);
}