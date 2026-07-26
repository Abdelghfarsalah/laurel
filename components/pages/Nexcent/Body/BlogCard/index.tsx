import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

export default function BlogCard({
  image,
  blog,
}: {
  image: string;
  blog: string;
}) {
  return (
    <div className="relative flex-1 ml-2 mr-3 mb-[100px]  md:mb-0">

      <Image
        src={image}
        width={368}
        height={286}
        alt="blog"
        className="object-cover"
      />

      <div className="absolute  bottom-[-50px] left-3 right-3 z-20 rounded-lg bg-neutral-silver px-5 py-4 text-center shadow-lg">
        <p className="text-neutral-grey text-16">
          {blog}
        </p>

        <div className="mt-3 flex items-center justify-center">
          <p className="text-brand-primary text-20 ">
            Read more
          </p>

          <FaArrowRightLong className="ml-5 text-brand-primary" />
        </div>
      </div>
    </div>
  );
}