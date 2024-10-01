import Nav from "@/layouts/main/nav";
import React, { useState, useEffect } from "react";
import { Manrope } from "next/font/google";
import Footer from "@/layouts/main/footer";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { TiSocialFacebook } from "react-icons/ti";
import { FaLinkedinIn } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Link from "next/link";
import NavModal from "@/layouts/main/nav-modal";

const manrope = Manrope({ subsets: ["latin"] });
const BlogDetails = () => {
  // const [id, setId] = useState("");
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
  const [data, setData] = useState<any>({});
  const router = useRouter();
  const fetchData = async (ids: string) => {
    // if (!id) return;
    const res = await axios.get(`/api/article?id=${ids}`);
    setData(res.data);
  };

  // useEffect(() => {
  //   // setId(router.query.slug as string);
  //   console.log(router.query.slug)
  //   if(router.query.slug !== undefined){
  //     fetchData( router.query.slug as string)
  //   }
  // }
  // , [router.query.slug]);

  // console.log(data, "data")

  return (
    <>
      <div
        className={`h-full flex flex-col bg-[#F4F9FF] bg-brand-main-gradient ${manrope.className}`}
      >
        <Nav />

        <main className="h-fit flex flex-col items-center justify-center">
          <div className="flex w-full overflow-hidden relative flex-col px-20 2xl:py-20 py-14 2xl:min-h-[600px] min-h-[400px] max-md:min-h-[250px] max-md:px-5 max-md:py-8">
            <Image
              src={data.image || "/blog/blog-detail-top.png"}
              layout="fill"
              className="object-cover w-full"
              alt="Blog"
            />

            {/* <Image 
           src={data.image || "/blog/blog-detail-top.png"}
           className="object-cover w-full " 
           alt="Blog"/> */}

            <div className="relative self-start 2xl:text-xl text-lg font-medium leading-7 text-neutral-400 max-md:max-w-full max-md:hidden block">
              {/* <span className="text-neutral-400">Home / Blog /</span>{" "} */}

              {/* {data.slug || "AI "} */}
              {/* {"Revolutionizing healthcare: the transformative power of AI"} */}
              <div

              >
                <Link className="text-neutral-400" href="/blog">Home</Link> / <Link href="/blog" className="text-neutral-400 mr-0.5">Blog</Link>
                / <span className="text-white">Revolutionizing healthcare: the transformative power of AI</span>
              </div>
            </div>
            <Link href="/main" className="relative self-start text-xs underline underline-offset-2 font-medium leading-7 text-white max-md:max-w-full hidden max-md:block">
              <ArrowLeft size={12} className="inline-flex mr-0.5" /> Go back to
              main
            </Link>
            <div className="flex relative flex-col self-center px-14 2xl:mt-24 mt-20  max-w-full w-[1257px] max-md:px-5 max-md:mt-6">
              <div className="2xl:text-7xl text-6xl max-md:text-xl  font-extrabold text-center text-white leading-[89px] max-md:max-w-full max-md:leading-[26px]">
                {/* {data.title || "AI in healthcare"}  */}
                Revolutionizing healthcare: the transformative power of AI
              </div>
              <div className="flex gap-5 justify-between self-center mt-6 max-w-full text-2xl font-semibold leading-8 text-white w-[441px] max-md:flex-wrap">
                <div className="flex gap-2">
                  <Image
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e2e28e9b39a87547f9bae12abedc02577fc75ecf294470f261e2a90ea245a5?"
                    className="shrink-0 my-auto w-6 max-md:w-4 aspect-square"
                    alt="lazy"
                  />
                  <p className="xxl:text-xl md:text-lg text-sm">
                    20 March, 2024
                    {/* {new Date(data.createdAt).toLocaleDateString() || "20 March, 2024"} */}
                    {/* {
                      formatDate(data.createdAt) || "20 March, 2024"
                    } */}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Image
                    loading="lazy"
                    alt="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f390c5d8747e1b0b2786f226c6845f8bb083ecbede63f1d45ee43aeb591dca5?"
                    className="shrink-0 my-auto w-6 max-md:w-4 aspect-square"
                  />
                  <p className="xxl:text-xl md:text-lg text-sm">
                    15 minutes read
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-12 max-md:gap-8 max-md:flex-col  p-8 max-md:p-5 xxl:max-w-[1600px] xl:max-w-[1200px]">
            <div className="w-4/5 max-md:w-full">
              <div className="flex flex-col">
                <div className="w-full 2xl:text-3xl text-2xl max-md:text-base font-semibold 2xl:leading-10 leading-8  text-justify text-slate-800 max-md:max-w-full">
                  In recent years, Artificial Intelligence (AI) has emerged as a
                  transformative force in numerous sectors, and healthcare
                  stands at the forefront of this revolution. By harnessing the
                  capabilities of AI, healthcare professionals are not only
                  optimizing operational efficiencies but are also delivering
                  more personalized and precise care to patients. This blog post
                  explores the various ways in which AI is reshaping the
                  landscape of healthcare, promising a future where technology
                  and human expertise converge to enhance patient outcomes.
                </div>
                <div className="mt-10 w-full text-3xl max-md:text-2xl font-semibold leading-10 text-slate-800 max-md:max-w-full">
                  Personalized patient care
                </div>
                <div className="mt-3 w-full text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-8  text-justify text-slate-800 max-md:max-w-full">
                  <span className="md:leading-10">One of the most </span>
                  exciting applications{" "}
                  <span className="md:leading-10">
                    of AI in healthcare is the development of personalized
                    treatment plans. Machine learning algorithms analyze vast
                    amounts of patient data, including genetic information,
                    lifestyle factors, and health history, to predict individual
                    health risks and outcomes. This personalized approach
                    enables doctors to tailor treatments specifically to each
                    patient’s unique needs, significantly improving the chances
                    of successful outcomes.
                  </span>
                </div>
                <div className="mt-9 w-full max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col  text-slate-800 max-md:mt-10 max-md:max-w-full">
                        <div className="text-3xl max-md:text-2xl  font-semibold leading-10 max-md:max-w-full">
                          Diagnostics and early detection
                        </div>
                        <div className="mt-3 text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-8 text-justify max-md:max-w-full">
                          <span className="md:leading-10">
                            AI’s potential in d
                          </span>
                          iagnostics and{" "}
                          <span className="md:leading-10">
                            early disease detection is groundbreaking. Deep
                            learning algorithms are now able to interpret MRIs,
                            X-rays, and other images, often with greater
                            accuracy and speed than human radiologists. Such
                            technology not only aids in the early detection of
                            diseases such as cancer but also reduces the
                            likelihood of false positives and negatives, leading
                            to quicker, more effective interventions.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow  text-slate-800 max-md:mt-10 max-md:max-w-full">
                        <div className="text-3xl max-md:text-2xl font-semibold leading-10 max-md:max-w-full">
                          Operational efficiency
                        </div>
                        <div className="mt-3 text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-8 text-justify max-md:max-w-full">
                          <span className="md:leading-10">AI-driven solu</span>
                          tions are streamlining{" "}
                          <span className="md:leading-10">
                            administrative tasks in healthcare settings, from
                            scheduling appointments to managing patient records
                            and billing. By automating these time-consuming
                            processes, AI frees up healthcare professionals to
                            focus more on patient care. Moreover, predictive
                            analytics help in managing hospital resources and
                            staffing, ensuring that healthcare facilities
                            operate smoothly and can adequately respond to
                            patient needs.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Image
                    src="/blog/doctor-surgeon-analyzing-patient-brain-testing-result-human-anatomy 1.png"
                    width={1000}
                    height={500}
                    className="mt-10"
                    alt="diagnostics"
                  />
                </div>
                <div className="mt-10 w-full text-3xl max-md:text-2xl font-semibold leading-10 text-slate-800 max-md:max-w-full">
                  Remote monitoring and telehealth
                </div>
                <div className="mt-3 w-full text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-8 text-justify text-slate-800 max-md:max-w-full">
                  <span className="md:leading-10">The rise of</span> wearable
                  technology and{" "}
                  <span className="md:leading-10">
                    mobile health apps equipped with AI capabilities has
                    propelled the growth of remote monitoring and telehealth
                    services. These tools continuously gather health data
                    outside traditional healthcare settings, offering real-time
                    insights into a patient{"'"}s condition. AI algorithms then
                    analyze this data to detect abnormalities or trends,
                    alerting healthcare providers to potential issues before
                    they become serious, thereby enabling timely intervention.
                  </span>
                </div>
                <div className="mt-9 w-full text-3xl max-md:text-2xl font-semibold leading-10 text-slate-800 max-md:max-w-full">
                  Challenges and ethical considerations
                </div>
                <div className="mt-3 w-full text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-8 text-justify text-slate-800 max-md:max-w-full">
                  <span className="md:leading-10">Despite it</span>s vast
                  potential, the integration
                  <span className="md:leading-10">
                    {" "}
                    of AI in healthcare is not without challenges. Issues of
                    data privacy, security, and the ethical use of patient
                    information are of paramount concern. Additionally, there’s
                    the challenge of ensuring that AI systems are transparent
                    and their decisions can be interpreted by human healthcare
                    providers.
                  </span>
                </div>
                <div className="mt-3 w-full text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-8 text-justify text-slate-800 max-md:max-w-full">
                  <span className="md:leading-10">Moreover, as AI syst</span>ems
                  require extensive data to learn and make predictions, there
                  {"'"}s an ongoing need to ensure that the data is
                  representative of diverse populations to prevent biases in
                  healthcare delivery.
                </div>
                <div className="mt-9 w-full text-3xl max-md:text-2xl font-semibold leading-10 text-slate-800 max-md:max-w-full">
                  Looking ahead
                </div>
                <div className="mt-3 w-full max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-8 text-justify text-slate-800 max-md:mt-3 max-md:max-w-full">
                        <div className="max-md:max-w-full">
                          <span className="md:leading-10">As AI con</span>tinues
                          to evolve, its impact on healt
                          <span className="md:leading-10">
                            hcare is expected to grow exponentially. The ongoing
                            collaboration between AI developers, healthcare
                            professionals, and policymakers is crucial in
                            addressing the challenges and ensuring that AI
                            technologies enhance healthcare delivery while
                            maintaining ethical standards.
                          </span>
                        </div>

                        <Image
                          src="/blog/looking-ahead.png"
                          width={480}
                          height={254}
                          className="mt-5"
                          alt="looking-ahead"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <div className="text-xl 2xl:text-2xl max-md:text-base max-md:font-normal leading-10 text-justify text-slate-800 max-md:mt-10 max-md:max-w-full">
                        The future of healthcare, augmented by AI, promises not
                        only more efficient and cost-effective care but also a
                        shift towards preventative medicine, where diseases can
                        be anticipated and prevented before they occur. In this
                        rapidly advancing landscape, AI stands as a beacon of
                        innovation, driving forward a healthcare revolution that
                        is more inclusive, personalized, and accessible to
                        all.The transformative power of AI in healthcare is
                        undeniable. From improving patient care to enhancing
                        operational efficiencies, AI is setting the stage for a
                        healthcare revolution. As we navigate the complexities
                        of integrating AI into healthcare, the focus must remain
                        on harnessing its potential responsibly to create a
                        future where health and technology work hand in hand to
                        improve the quality of life for people around the globe.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-4/5 max-md:w-full">
            <div
                className=" whitespace-pre-line "
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: data.content || "<div>loading...</div>"}}
              />
            </div> */}

            <div
              className="max-md:flex max-md:justify-center"
            >
              <div className="flex flex-col max-w-[400px] 2xl:max-w-[500px]">
                <div className="w-full text-3xl max-md:py-8 max-md:border-t max-md:border-solid max-md:border-[#D3D3D3] max-md:text-center max-md:text-2xl font-bold leading-10 text-gray-800 max-md:max-w-full">
                  Latest articles
                </div>
                <div className="p-5 md:mt-4 w-full bg-white rounded-3xl max-md:max-w-full">
                  <div className="flex gap-5 max-md:gap-2">
                    <div className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
                      <Image
                        src="/blog/article-1.png"
                        width={120}
                        height={120}
                        className="shrink-0 max-w-full aspect-square w-[120px] max-md:mt-0"
                        alt="article-1"
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-[72%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow max-md:mt-0">
                        <p className="text-base max-md:text-sm leading-6 text-zinc-500">
                          15 minutes read
                        </p>
                        <div className="mt-2 text-xl max-md:text-base font-medium leading-7 text-gray-800">
                          AI in healthcare: revolutionizing diagnosis and
                          treatment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 mt-6 w-full bg-white rounded-3xl max-md:max-w-full">
                  <div className="flex gap-5 max-md:gap-2">
                    <div className="flex flex-col w-[28%] max-md:ml-0 max-md:w-full">
                      <Image
                        src="/blog/article-1.png"
                        width={120}
                        height={120}
                        className="shrink-0 max-w-full aspect-square w-[120px] max-md:mt-0"
                        alt="article-1"
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-[72%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow max-md:mt-0">
                        <p className="text-base max-md:text-sm leading-6 text-zinc-500">
                          15 minutes read
                        </p>
                        <div className="mt-2 text-xl max-md:text-base font-medium leading-7 text-gray-800">
                          AI in healthcare: revolutionizing diagnosis and
                          treatment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col pt-8 mt-12 w-full border-t border-solid border-neutral-300 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-4 px-5 max-md:hidden">
                    <div className="flex-1 text-3xl font-bold leading-10 text-gray-800">
                      Top articles
                    </div>
                    <div className="flex gap-3">
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
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(" h-12 w-12 rounded-full")}
                        disabled={api?.canScrollNext() === false}
                        onClick={() => api?.scrollNext()}
                      >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Next slide</span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Carousel setApi={setApi}>
                      <CarouselContent
                        className=" max-md:max-w-[350px]"
                      >
                        <CarouselItem
                          className=""
                        >
                          <CardTop />
                        </CarouselItem>
                        <CarouselItem
                          className=""
                        >
                          <CardTop />
                        </CarouselItem>
                        <CarouselItem
                          className=""
                        >
                          <CardTop />
                        </CarouselItem>
                      </CarouselContent>
                    </Carousel>
                  </div>
                  <div
                    className="md:hidden"
                  >
                    <div className="py-6 flex justify-between gap-5 w-[35%] mx-auto">
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

                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(" h-12 w-12 rounded-full")}
                        disabled={api?.canScrollNext() === false}
                        onClick={() => api?.scrollNext()}
                      >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Next slide</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col px-5 py-8 mt-12 w-full border-t border-solid border-neutral-300 max-md:mt-10 max-md:max-w-full">
                  <div className="w-full text-3xl max-md:text-2xl font-bold leading-10 text-gray-800 max-md:max-w-full">
                    Did you like the article? Share it with your friends
                  </div>
                  <div className="flex gap-4 pr-20 mt-4 max-md:flex-wrap max-md:pr-5">
                    <Link target="_blank" href={'https://www.facebook.com/talkhealthai'} aria-label="Visit our Facebook page"><div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-footer text-xl">
                      <TiSocialFacebook className="text-2xl" />
                    </div></Link>
                    <Link target="_blank" href={'https://www.linkedin.com/company/talkhealthai/'} aria-label="Visit our Facebook page"><div className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-footer text-xl">
                      <FaLinkedinIn className="text-2xl" />
                    </div></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogDetails;

function formatDate(date: any) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  // @ts-ignore
  return new Date(date).toLocaleDateString("en-GB", options);
}


const CardTop = () => {
  return (<>
    <div className="flex flex-col pt-3 pr-1.5 pb-6 pl-3 mt-4 w-full bg-white rounded-[40px] max-md:max-w-full">
      <Image
        src="/blog/top-article-1.png"
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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2749b6e4ab9d12eb9e85029a4b28d7b2f6d9366deb6cadabe0575382bab0d2a3?"
            className="shrink-0 self-start w-6 max-md:w-4 aspect-square"
          />
          <p className="xxl:text-xl md:text-lg text-sm">
            10 March, 2024
          </p>
        </div>
        <div className="flex gap-1">
          <Image
            loading="lazy"
            alt="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6012e12638c0ba1f3e6b42753602a956c6ba3a6cb5fee1ced357ae5a6d36747c?"
            className="shrink-0 self-start w-6 max-md:w-4 aspect-square"
          />
          <p className="xxl:text-xl md:text-lg text-sm">
            10 minutes read
          </p>
        </div>
      </div>
      <div className="mt-4 text-2xl max-md:text-xl font-medium leading-8 text-gray-800 max-md:mr-2.5 max-md:max-w-full">
        The future of medicine: how AI is reshaping healthcare
      </div>
    </div>
    <NavModal />
  </>)
}