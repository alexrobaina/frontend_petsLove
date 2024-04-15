import { FC, useState } from 'react'
import SwiperCore from 'swiper'
import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

interface Props {
  slides: string[]
}
const SwiperGallery: FC<Props> = ({ slides }) => {
  const [activeThumb] = useState<SwiperCore | null>(null)
  const pictures = Object.values(slides)

  return (
    <>
      <div className="mt-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
          className="w-[70vw] md:w-[70vw] lg:w-[70vw] xl:w-full m-0 rounded-xl"
          loop={true}
          navigation={true}
          grabCursor={true}
          thumbs={{
            swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },

            480: {
              slidesPerView: 2,
            },

            640: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            1336: {
              slidesPerView: 4,
              spaceBetween: 1,
            },
          }}
        >
           {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {pictures.map((slide: any, index) => (
            <SwiperSlide key={index}>
              <img src={slide} alt={'title'} id={slide.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default SwiperGallery
