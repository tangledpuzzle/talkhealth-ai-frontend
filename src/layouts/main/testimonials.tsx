import Carousel from "./testimonials/Carousel";

const Testimonials = () => {
  return (
    <div className="w-full overflow-x-hidden bg-white py-24">
      <h1 className="text-3xl sm:text-5xl font-bold text-primary-violet text-center">
        Testimonials
      </h1>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-[100rem] flex justify-center items-center">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
