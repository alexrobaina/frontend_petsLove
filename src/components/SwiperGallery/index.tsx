import { FC, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css'

interface Props {
  slides: string[]
}
const SwiperGallery: FC<Props> = ({ slides }) => {
  const [activeThumb, setActiveThumb] = useState<SwiperCore | null>(null)
  const pictures = Object.values(slides)
  return (
    <>
      <div className="mt-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
          className="w-80 md:w-[800px]"
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          navigation={true}
          grabCursor={true}
          thumbs={{
            swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {pictures.map((slide: any, index) => (
            <SwiperSlide key={index}>
              <img className="w-full" src={slide} alt={'title'} id={slide.id} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <Swiper
          modules={[Navigation, Thumbs]}
          className="mt-4 w-80 md:w-[500px]"
          loop={true}
          onSwiper={setActiveThumb}
          spaceBetween={5}
          slidesPerView={4}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {pictures.map((slide: any, index) => (
            <SwiperSlide key={index}>
              <div>
                <img src={slide} alt={'slide'} id={slide.id} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </>
  )
}

export default SwiperGallery
