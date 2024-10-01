"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useRef } from "react";
import Slider, { Settings } from "react-slick";

import Card from "./Card";

interface CarouselProps {}

const styles = {
  normal: {
    width: "30px",
    height: "30px",
    borderRadius: "99999px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Carousel: FC<CarouselProps> = ({}) => {
  const sliderRef = useRef<Slider>(null); // Update the type of sliderRef
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerPadding: "35%",
    centerMode: true,
    arrows: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          adaptiveHeight: true,
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    appendDots: (
      dots: JSX.Element[] // Correct the type for dots
    ) => (
      <div>
        <ul style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ ...styles.normal }}
            className="car-btn"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft />
          </div>
          {dots}
          <div
            style={{ ...styles.normal }}
            className="car-btn"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight />
          </div>
        </ul>
      </div>
    ),
  };

  return (
    <Slider
      {...settings}
      ref={sliderRef}
      className="w-full h-[28rem] 2xl:min-h-96 border relative blog-slider my-10 transition-all duration-500"
    >
      <Card
        image="/blog.png"
        content="AI in healthcare: revolutionizing diagnosis
and treatment"
      />
      <Card
        image="/blog3.png"
        content="Harnessing AI: transforming medical decision-making"
      />
      <Card
        image="/blog2.png"
        content="The future of medicine: how AI is reshaping healthcare"
      />
      <Card
        image="/blog3.png"
        content="Harnessing AI: transforming medical decision-making"
      />
      <Card
        image="/blog2.png"
        content="The future of medicine: how AI is reshaping healthcare"
      />
    </Slider>
  );
};

export default Carousel;
