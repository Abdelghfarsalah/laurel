import { useTranslations } from "next-intl";
import CustomFeatureCard from "./CommunityItem";

export default function HomeCommunity(){
    const t = useTranslations("HomeCommunity");
    return <div className="flex flex-col items-center text-center mt-10 mb-10">
        <p className="text-neutral-d-grey font-bold text-36">{t("title1")}</p>
        <p className="text-neutral-d-grey font-bold text-36">{t("title2")}</p>
        <p className="text-neutral-grey  text-16 mb-5">{t("subtitle")}</p>
        <div className="flex flex-wrap justify-around w-full mt-5">
            <CustomFeatureCard
            title={t("cards.membership.title")}
            description={t("cards.membership.description")}
            icon="/images/home/ComunityIcons/Icon.png"
            />
            <CustomFeatureCard
            title={t("cards.associations.title")}
            description={t("cards.associations.description")}
            icon="/images/home/ComunityIcons/Group 1.png"
            />
            <CustomFeatureCard
            title={t("cards.clubs.title")}
            description={t("cards.clubs.description")}
            icon="/images/home/ComunityIcons/Icon (1).png"
            />
        </div>
    </div>
}