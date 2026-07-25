"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";

export default function Slider() {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      slidesPerView={1}
      loop={true}
      spaceBetween={0}
      className="custom-swiper w-full"
    >
      <SwiperSlide>
        sl;oder
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-[300px] w-full bg-blue-500">
          Slide 2
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-[300px] w-full bg-green-500">
          Slide 3
        </div>
      </SwiperSlide>
    </Swiper>
  );
}