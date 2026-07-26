import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogCard from "./BlogCard";
import CountCard from "./CountsCard";
import HomeBodyCard from "./HomeBodyCard";

export default function Body(){
    const t = useTranslations("Body");
    return <div >
    <HomeBodyCard title={t("card1.title")} subtitle={t("card1.subtitle")} button={t("card1.button")} image={"/images/home/body/Frame 35.png"} />
    <div className="mt-5 mb-10 ml-0 mr-0 pt-7 pb-8 block md:flex justify-between pl-20 bg-neutral-silver">
        <div>
            <p className="text-neutral-d-grey font-bold text-36 ">{t("stats.helpingLocal")} </p>
            <p className="text-brand-primary font-bold text-36 ">{t("stats.businessReinvent")} </p>
            <p className="text-brand-secondary  text-16 ">{t("stats.reachedHere")}</p>
        </div>
        <div className="grid  grid-cols-2 gap-4 md:mr-20 mt-10 md:mt-0">
            <CountCard image={"/images/home/body/Icon (2).png"} count={"2,245,341"} description={t("stats.members")} />
            <CountCard image={"/images/home/body/Icon (3).png"} count={"46,328"} description={t("stats.clubs")} />
            <CountCard image={"/images/home/body/Icon (4).png"} count={"828,867"} description={t("stats.eventBookings")} />
            <CountCard image={"/images/home/body/Icon (5).png"} count={"1,926,436"} description={t("stats.payments")} />
        </div>
    </div>
    <HomeBodyCard title={t("card2.title")} subtitle={t("card2.subtitle")} button={t("card2.button")} image={"/images/home/body/pana.png"} />
    <div className="md:flex block justify-center pb-10 pl-25  bg-neutral-silver">
        <div className="flex justify-center flex-1 ">
            <Image
                className="w-full h-full object-contain"
                src={"/images/home/body/image 9.png"}
                alt="image not found"
                width={441}
                height={200}
            />
        </div>
        <div className="flex-3 ml-0 md:ml-10 mt-4 md:mt-0">
            <p className="text-14 mt-2 mr-5 md:max-w-160 text-neutral-grey">{t("testimonial.quote")}</p>
            <p className="text-brand-primary mt-2 text-20 ">{t("testimonial.name")}</p>
            <p className="text-14 max-w-[50%] mt-2 mb-4 text-neutral-grey">{t("testimonial.organization")}</p>
            <div className="flex items-center justify-between mr-5 ">
                <div className="flex flex-wrap  items-center ">
                    <Image  src={"/images/home/Clients/Logo.png"}     width={40} height={40}  alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/home/Clients/Logo (1).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/home/Clients/Logo (2).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/home/Clients/Logo (3).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/home/Clients/Logo (4).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/home/Clients/Logo (5).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/home/Clients/Logo (6).png"} width={40} height={40} alt="jhjhmbn" />
                    </div>
                <div className="flex items-center ">
                <p className="text-brand-primary text-20 ">{t("testimonial.meetAll")}</p>
                <FaArrowRightLong className="ml-5 text-brand-primary"/>
                </div>
            </div>
        </div>
        </div>
    <div className=" flex flex-col w-full justify-center items-center">
        <p className="text-neutral-d-grey font-bold text-36">{t("blog.title")}</p>
        <p  className="text-neutral-grey max-w-[600px] text-16 mb-5 text-center">
            {t("blog.description")}</p>
        <div className="md:flex mb-10 mt-5">
            <BlogCard image={"/images/home/body/image 18.png"} blog={t("blog.card1")} readMore={t("blog.readMore")} />
            <BlogCard image={"/images/home/body/image 19.png"} blog={t("blog.card2")} readMore={t("blog.readMore")} />
            <BlogCard image={"/images/home/body/image 20.png"} blog={t("blog.card3")} readMore={t("blog.readMore")} />
           
        </div>
    </div>
    </div>
}
