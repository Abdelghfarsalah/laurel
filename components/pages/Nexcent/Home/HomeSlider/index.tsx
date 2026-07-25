"use client";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import CustomSwiperSlide from "./CustomSwiperSlide";
import "./slider.css";

export default function Slider() {
    return (
    <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        loop={true}
        spaceBetween={0}
        className="custom-swiper w-full ">
           
        <SwiperSlide>
            <CustomSwiperSlide 
            title="Lessons and insights "
            subtitle="from 8 years"
            description="Where to grow your business as a photographer: site or social media?"
            button="Register"
            image="/images/Illustration.png"
            />
        </SwiperSlide>
           
        <SwiperSlide>
            <CustomSwiperSlide 
            title="Lessons and insights "
            subtitle="from 8 years"
            description="Where to grow your business as a photographer: site or social media?"
            button="Register"
            image="/images/Illustration.png"
            />
        </SwiperSlide>
           
        <SwiperSlide>
            <CustomSwiperSlide 
            title="Lessons and insights "
            subtitle="from 8 years"
            description="Where to grow your business as a photographer: site or social media?"
            button="Register"
            image="/images/Illustration.png"
            />
        </SwiperSlide>
    </Swiper>
    );    
}