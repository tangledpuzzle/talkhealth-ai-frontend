"use client"

import Carousel from './blog/Carousel';

const Blog = () => {
    return (
        <div id="blog" className="w-full overflow-x-hidden bg-[#D2EBF3] py-24 sm:px-5 lg:pl-10 flex flex-col items-center justify-center gap-8">
            <div className="w-full flex items-center justify-center lg:justify-between max-w-[100rem]">
                <span className="lg:text-4xl text-5xl font-bold">Read our blog</span>
                <button className="hidden lg:block p-2 px-4 rounded-full bg-brand-main transition-all duration-500 text-sm text-white hover:bg-transparent hover:ring-1 hover:ring-brand-main hover:text-brand-main">
                    Subscribe for our news
                </button>
            </div>

            {/* carousel */}
            <div className="w-full overflow-x-hidden max-w-[100rem]">
                <Carousel />
            </div>
            <button
                className="p-5 lg:p-2 block lg:hidden w-[90%] lg:w-fit rounded-full bg-brand-main transition-all duration-500 text-sm text-white hover:bg-brand-darkblue hover:ring-1 hover:ring-brand-main hover:text-white"
            >
                Subscribe for our news
            </button>
        </div>
    )
}

export default Blog;
