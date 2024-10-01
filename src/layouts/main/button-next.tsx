import { FaArrowRight } from "react-icons/fa6"
import { useSwiper } from "swiper/react"

export const ButtonNext = () => {
    const swiper = useSwiper()

    return (
        <FaArrowRight onClick={() => swiper.slideNext()} />
    )
}
