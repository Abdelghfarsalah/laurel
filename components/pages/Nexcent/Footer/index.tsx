import { CustomButton } from "@/components/shared/CustomButton";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FooterButtonCollection from "./FooterButtonCollection";

export default function Footer(){
    const t = useTranslations("Footer");
    return <div  className="flex flex-col items-center mt-15 bg-neutral-silver ">

        <p className="text-neutral-d-grey font-bold text-36">Pellentesque suscipit </p>
        <p className="text-neutral-d-grey font-bold text-36 mb-10">fringilla libero eu.</p>
        <CustomButton title={t("cta.button")} width={"w-[178px]"} height={"h-[52px]"} />
        <div className="block md:flex justify-between w-full bg-[#121a1d] mt-5 pr-5 pt-10 pb-10 pl-5  ">
            <div>
                <Image className="mb-5 flex-2" src={"/images/Company Info.png"} width={300} height={400} alt="image not found"/>
            </div>
            <div className="flex-1 shrink">

            </div>
            <div className="flex-2 flex justify-around"><FooterButtonCollection
            title={t("company.title")}
            buttons={[
                t("company.aboutUs"),
                t("company.blog"),
                t("company.contactUs"),
                t("company.pricing"),
                t("company.testimonials"),
            ]}
            />
            <FooterButtonCollection
            title={t("support.title")}
            buttons={[
                t("support.helpCenter"),
                t("support.termsOfService"),
                t("support.legal"),
                t("support.privacyPolicy"),
                t("support.status"),
            ]}
            />
            </div>
            <div>
                <p className="text-white  text-20 font-bold ">
                {t("stayUpdated.title")}
                </p>
            <InputGroup
  className="
    mt-5
    h-[36px]
    rounded-md
    border-0
    bg-[#59636A]
    focus-within:border-0
    focus-within:ring-0
  "
>
  <InputGroupInput
    id="inline-end-input"
    type="email"
    className="
      h-full
      border-0
      bg-transparent
      text-white
      placeholder:text-[#D1D5DB]
      outline-none
      focus:border-0
      focus:outline-none
      focus:ring-0
    "
    placeholder={t("stayUpdated.emailPlaceholder")}
  />

  <InputGroupAddon align="inline-end">
    <Send className="h-4 w-4 text-white" />
  </InputGroupAddon>
</InputGroup>
            </div>
            </div>
        </div>
}
