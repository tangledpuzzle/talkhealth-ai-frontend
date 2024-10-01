import { FaArrowLeft } from "react-icons/fa6"
import { useSwiper } from "swiper/react"

export const ButtonPrev = () => {
    const swiper = useSwiper()

    return (
        <FaArrowLeft onClick={() => swiper.slidePrev()} />
    )
}
