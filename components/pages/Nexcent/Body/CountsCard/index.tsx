import { CountCardtype } from "@/types/home";
import Image from "next/image";
export default function CountCard({image ,count,description}:CountCardtype){
    return <div className="flex ">
          <Image
                    src={image}
                    alt="image not found"
                    width={48}
                    height={48}
                />
        <div className="ml-2  "> 
            <p className="text-neutral-d-grey font-bold text-28 ">{count}</p>
            <p className="text-16   text-neutral-grey">{description}</p>
        </div>
    </div>
}