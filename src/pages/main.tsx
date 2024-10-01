import Forgpass from "@/layouts/main/auth/forgpass";
import Login from "@/layouts/main/auth/login";
import Signup from "@/layouts/main/auth/signup";
import Footer from "@/layouts/main/footer";
import Nav from "@/layouts/main/nav";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NavModal from "@/layouts/main/nav-modal";
import Blog from "@/layouts/main/blog";
import Features from "@/layouts/main/features";
import Hero from "@/layouts/main/hero";
import HowItWorks from "@/layouts/main/how-it-works";
import Mission from "@/layouts/main/mission";
import Testimonials from "@/layouts/main/testimonials";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
    return (
        <div
            className={`h-full flex flex-col bg-[#F4F9FF] bg-brand-main-gradient ${manrope.className}`}
        >
            <Nav />
            <main className="h-fit flex flex-col items-center justify-center">
                <Hero />
                <HowItWorks />
                <Features />
                <Mission />
                <Testimonials />
                <Blog />
            </main>
            <Login />
            <Signup />
            <Forgpass />
            <NavModal />
            <Footer />
        </div>
    );
}
