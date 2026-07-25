import { CustomButton } from "@/components/shared/CustomButton";
import { CustomSwiperSlidertype } from "@/types/home";
import Image from "next/image";

export default function CustomSwiperSlide({title,subtitle,description,button,image}:CustomSwiperSlidertype){
  return <div className="flex justify-between mr-10  ml-10 mt-10">
  <div className="LeftSwiperSlide">
    <p className="text-neutral-d-grey font-bold text-64">{title}</p>
    <p className="text-brand-primary font-bold text-64">{subtitle}</p>
    <p className="text-neutral-grey  text-16 mb-5">{description}</p>
    <CustomButton title={button} width={"w-[128px]"} height={"h-[52px]"} />
  </div>
  <Image className="hidden md:block" src={image} width={391} height={407} alt="jhjhmbn" />
  </div>
}