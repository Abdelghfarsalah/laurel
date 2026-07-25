import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomeClients(){
    const t = useTranslations("HomeClients");
    return <div className="flex flex-col items-center text-center mt-10 mb-10">
    <p className="text-neutral-d-grey font-bold text-36">{t("title")}</p>
    <p className="text-neutral-grey  text-16 mb-5">{t("description")}</p>
    <div className="flex flex-wrap justify-around w-full mt-5">
    <Image src={"/images/Clients/Logo.png"} width={48} height={48} alt="jhjhmbn" />
    <Image src={"/images/Clients/Logo (1).png"} width={48} height={48} alt="jhjhmbn" />
    <Image src={"/images/Clients/Logo (2).png"} width={48} height={48} alt="jhjhmbn" />
    <Image src={"/images/Clients/Logo (3).png"} width={48} height={48} alt="jhjhmbn" />
    <Image src={"/images/Clients/Logo (4).png"} width={48} height={48} alt="jhjhmbn" />
    <Image src={"/images/Clients/Logo (5).png"} width={48} height={48} alt="jhjhmbn" />
    <Image src={"/images/Clients/Logo (6).png"} width={48} height={48} alt="jhjhmbn" />
    </div>
    </div>
}