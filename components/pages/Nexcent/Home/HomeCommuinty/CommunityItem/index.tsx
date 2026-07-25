import { CustomFeatureCardProps } from "@/types/home";
import Image from "next/image";

export default function CustomFeatureCard({
  title,
  description,
  icon,
}: CustomFeatureCardProps) {
  return (
    <div className="flex w-full  sm:max-w-[18%] flex-col items-center   bg-background px-3 py-4 text-center">
      <div className="mb-2 flex h-7 w-7 items-center justify-center  bg-[#E8F5E9]">
        <Image
          src={icon}
          width={65}
          height={65}
          alt={title}
        />
      </div>

      <h3 className="text-24 font-bold l text-neutral-d-grey">
        {title}
      </h3>

      <p className="mt-1 text-14 leading-[20px] text-neutral-grey">
        {description}
      </p>
    </div>
  );
}