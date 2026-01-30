const img1 = "https://i.ibb.co/8KwT34K/Banner01.png"
const img2 = "https://i.ibb.co/MBJ5n4c/Banner02.png"
const img4 = "https://i.ibb.co/kQMfPbP/Banner04.png"
const img5 = "https://i.ibb.co/CsCTydR/Banner05.png"
const img6 = "https://i.ibb.co/8MfpXdt/Banner06.png"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'


export default function Banner () {
    return (
      <div className='container px-6 py-10 mx-auto'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <Slide
              image={img1}
              text='EatEassy: Simplifying Your Meal Management'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={img2}
              text='EatEassy: Simplifying Your Meal Management'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={img4}
              text='EatEassy: Simplifying Your Meal Management'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={img5}
              text='EatEassy: Simplifying Your Meal Management'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              image={img6}
              text='EatEassy: Simplifying Your Meal Management'
            />
          </SwiperSlide>
        </Swiper>
      </div>
    )
  }