"use client";
import { FC } from "react";
import Slider from "react-slick";
import Card from "./Card";
import { testimonialData } from "@/lib/ui-data";

interface CarouselProps {}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  centerPadding: "15%",
  centerMode: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 364,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

const Carousel: FC<CarouselProps> = ({}) => {
  return (
    <Slider {...settings} className="w-full my-10">
      {testimonialData.map((testimonial, i) => (
        <Card
          nbr={testimonial.rating}
          person={{
            image: testimonial.image,
            name: testimonial.name,
            role: testimonial.state,
          }}
          content={testimonial.caption}
          key={i}
        />
      ))}
      {/* <Card
        nbr={1}
        person={{ name: "David L.", image: "/avatar.png", role: "Seattle, WA" }}
        content="Great for managing my chronic condition. The app provided clear explanations, enhancing my understanding and doctor visits."
      />
      <Card
        nbr={1}
        person={{ name: "David L.", image: "/avatar.png", role: "Seattle, WA" }}
        content="Great for managing my chronic condition. The app provided clear explanations, enhancing my understanding and doctor visits."
      />
      <Card
        nbr={1}
        person={{ name: "David L.", image: "/avatar.png", role: "Seattle, WA" }}
        content="Great for managing my chronic condition. The app provided clear explanations, enhancing my understanding and doctor visits."
      />
      <Card
        nbr={1}
        person={{ name: "David L.", image: "/avatar.png", role: "Seattle, WA" }}
        content="Great for managing my chronic condition. The app provided clear explanations, enhancing my understanding and doctor visits."
      /> */}
    </Slider>
  );
};

export default Carousel;
