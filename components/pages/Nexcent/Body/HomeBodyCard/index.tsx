import { CustomButton } from "@/components/shared/CustomButton";
import { HomeBodyCardType } from "@/types/home";
import Image from "next/image";
export default function HomeBodyCard({title ,subtitle,button ,image}:HomeBodyCardType){
    return <div className="md:flex block justify-center mb-10 ml-5 sm:ml-30">
    <div className="flex justify-center flex-1 ">
        <Image
            className="w-full h-full object-contain"
            src={image}
            alt="image not found"
            width={441}
            height={300}
        />
    </div>
    <div className="flex-3 ml-0 md:ml-10 mt-4 md:mt-0">
        <p className="text-neutral-d-grey font-bold text-36 ">{title}</p>
        <p className="text-14 max-w-[50%] mt-4 mb-4 text-neutral-grey">{subtitle}</p>
        <CustomButton title={button} width={"w-[151px]"} height={"h-[52px]"} />
    </div>
    </div>
}