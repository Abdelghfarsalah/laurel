
import { FooterButtonCollectionProps } from "@/types/home";

export default function FooterButtonCollection({
  title,
  buttons,
}: FooterButtonCollectionProps) {
  return (
    <div className="mb-5 flex  flex-col items-start gap-4">
      <p className="text-white text-20 font-bold">
        {title}
      </p>

      <div className="flex flex-col items-start gap-3">
        {buttons.map((button, index) => (
            <p  key={index} className="h-auto p-0 text-14 text-[#F5F7FA] hover:underline cursor-pointer">{button}</p>
            // <Button key={index}   variant="link" className="h-auto! p-0! text-14! text-neutral-silver!">{button}</Button>
        ))}
      </div>
    </div>
  );
}