import { Button } from "@/components/ui/button"
import { CustomButtontype } from "@/types/home"

export function CustomButton({title,width,height}:CustomButtontype) {
  return <Button  className={`bg-button-header-color text-neutral-white ${width} ${height}`}>{title}</Button>
}
