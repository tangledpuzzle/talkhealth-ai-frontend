import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const RecommendToRead = (
  { data }: { data: any[] }
) => {
  return (
    <div>
        <div className="flex flex-col bg-[#F4F9FF] py-24 max-md:py-8 w-full min-w-[10rem] max-w-[100rem] px-5 sm:px-10">
      <div className="w-full text-6xl font-extrabold text-gray-800 max-md:max-w-full max-md:text-4xl">
        We recommend to read
      </div>
      <div className="p-4 mt-6 w-full bg-white rounded-[40px] max-md:max-w-full">
        <Link href={`/blog/${ "ab"}`}
    // className="cursor-pointer"
     className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            {/* <img
              loading="lazy"
              srcSet="..."
              className="grow w-full aspect-[1.59] max-md:mt-10 max-md:max-w-full"
            /> */}
            <Image src="/blog/recomm-article.png" width={768} height={480} alt="article"/>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-4 justify-between self-start px-6 text-lg leading-6 text-zinc-500 max-md:px-5">
                <div className="flex gap-2">
                  <Image
                    loading="lazy"
                    alt="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5f4d04702c3f25acb6490b92321fb9e02d99cad18f0e6074c8469bd03b205ac?"
                    className="shrink-0 self-start w-6 aspect-square"
                  /> 
                  <p   className="xxl:text-xl md:text-lg text-sm">20 March, 2024</p>
                </div>
                <div className="flex gap-2">
                  <Image
                    loading="lazy"
                    alt="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5923285a6a3a124f44efa246b685091fa6ec54b69c6a315ad9e09ffe3d740d06?"
                    className="shrink-0 self-start w-6 aspect-square"
                  />
                  <p   className="xxl:text-xl md:text-lg text-sm">10 minutes read</p>
                </div>
              </div>
              <div className="flex flex-col px-6 mt-8 max-md:px-5 max-md:max-w-full">
                <div className="text-2xl font-medium leading-9 text-gray-800 max-md:max-w-full">
                  AI-assisted surgery: redefining precision and patient outcomes
                </div>
                <p className="mt-5 max-md:hidden text-base leading-8 text-ellipsis text-slate-800 max-md:max-w-full">
                  In recent years, Artificial Intelligence (AI) has emerged as a
                  transformative force in numerous sectors, and healthcare
                  stands at the forefront of this revolution. By harnessing the
                  capabilities of AI, healthcare professionals are not only
                  optimizing operational efficiencies but are also delivering
                  more personalized and precise care to patients. This blog post
                  explores the various ways in which AI is reshaping the
                  landscape of healthcare, promising a future where technology
                  and human expertise converge to enhance patient outcomes.
                </p>
                <p className="mt-5 md:hidden text-base leading-8 text-ellipsis text-slate-800 max-md:max-w-full">
                 {
                  ` In recent years, Artificial Intelligence (AI) has emerged as a
                  transformative force in numerous sectors, and healthcare
                  stands at the forefront of this revolution. By harnessing the
                  capabilities of AI, healthcare professionals are not only
                  optimizing operational efficiencies but are also delivering
                  more personalized and precise care to patients. This blog post
                  explores the various ways in which AI is reshaping the
                  landscape of healthcare, promising a future where technology
                  and human expertise converge to enhance patient outcomes.`.slice(0, 120) + ' ...'
                 }
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-14 w-full border border-solid bg-neutral-300 border-neutral-300 min-h-[1px] max-md:mt-10 max-md:max-w-full" />
      <div className="px-5 max-md:px-0 mt-16 w-full max-md:mt-10 max-md:max-w-full pb-8">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <RecommendToReadSmallCard imageUrl="/blog/small-article-sm.png" text=" AI and mental health: innovations in diagnosis and treatment"/>
          <RecommendToReadSmallCard  imageUrl="/blog/recomm-article2.png" text=" The future of diagnosis: AI's role in medical imaging"/>
          <RecommendToReadSmallCard  imageUrl="/blog/recomm-article3.png" text="AI in healthcare: revolutionizing diagnosis and treatment"/>
         
        </div>
      </div>
    </div>
    </div>
  )
}

export default RecommendToRead

const RecommendToReadSmallCard = (
  {text,imageUrl}: {text:string,imageUrl:string}
) => {
  return(
    <>
    <Link href={`/blog/${ "ab"}`}
    // className="cursor-pointer"
     className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="grow p-3 w-fit bg-white rounded-[30px] max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:gap-2">
                <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                <Image src={imageUrl} alt='image' width={140} height={140} />
                </div>
                <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col self-stretch my-auto max-md:mt-0">
                    <div className="flex gap-1 text-lg leading-6 text-zinc-500">
                      <Image
                        loading="lazy"
                        alt="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7e1f2b2a23c4f9a3019203cb5c75bbfc0fd014f7b39c8feaa338ee017cb927?"
                        className="shrink-0 self-start w-6 aspect-square"
                      />
                      <p className="xxl:text-xl md:text-lg text-sm">20 March, 2024</p>
                    </div>
                    <div className="mt-4 text-2xl max-md:text-base font-medium leading-7 text-gray-800">
                    {text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
    </>
  )
}

function formatDate(date:any) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  // @ts-ignore
  return new Date(date).toLocaleDateString('en-GB', options);
}