"use client";

import { useTranslations } from "next-intl";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import CustomSwiperSlide from "./CustomSwiperSlide";
import "./slider.css";

export default function Slider() {
  const t = useTranslations("HomeSlider");

  return (
    <div className="slider-wrapper bg-neutral-silver pb-2">
      <Swiper
        modules={[Pagination]}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        slidesPerView={1}
        loop={true}
        spaceBetween={0}
        className="custom-swiper w-full"
      >
        <SwiperSlide>
          <CustomSwiperSlide
            title={t("title")}
            subtitle={t("subtitle")}
            description={t("description")}
            button={t("button")}
            image="/images/Illustration.png"
          />
        </SwiperSlide>

        <SwiperSlide>
          <CustomSwiperSlide
            title={t("title")}
            subtitle={t("subtitle")}
            description={t("description")}
            button={t("button")}
            image="/images/Illustration.png"
          />
        </SwiperSlide>

        <SwiperSlide>
          <CustomSwiperSlide
            title={t("title")}
            subtitle={t("subtitle")}
            description={t("description")}
            button={t("button")}
            image="/images/Illustration.png"
          />
        </SwiperSlide>
      </Swiper>

      {/* Dots always below the slider */}
      <div className="custom-pagination " />
    </div>
  );
}