import { Button } from "@/components/ui/button"
import { buttonType } from "@/types/home"


export default function HeaderActionButton({title,color}:buttonType){
    return <Button variant="link" className={`text-16  ${color}`}>{title}</Button>
}

