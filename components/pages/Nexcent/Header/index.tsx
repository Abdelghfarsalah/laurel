import { CustomButton } from "@/components/shared/CustomButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import HeaderActionButton from "../../../shared/HeaderActionButton";


export default function Header(){
    const t = useTranslations("Header");
    
    return <div className="Header flex justify-between  pr-5 pl-5 pt-5 sticky top-0 bg-background z-1000" >
        <Image src={"/images/Logo.png"} width={155} height={24} alt="image not found"/>
        <div className="action w-[41%]  justify-between hidden md:flex">
            <HeaderActionButton color="text-brand-secondary"  title={t("navigation.home")} />
            <HeaderActionButton color="text-brand-secondary"  title={t("navigation.service")} />
            <HeaderActionButton color="text-brand-secondary"  title={t("navigation.feature")} />
            <HeaderActionButton color="text-brand-secondary"  title={t("navigation.product")} />
            <HeaderActionButton color="text-brand-secondary"  title={t("navigation.testimonial")} />
            <HeaderActionButton color="text-brand-secondary"  title={t("navigation.faq")} />
        </div>
        <div className="AuthButton">
            <HeaderActionButton color="text-brand-primary " title={t("auth.login")}/>
            <CustomButton title={t("auth.signup")} height={"h-[40px]"}  width="w-[91px]"/>
        </div>
    </div>
}