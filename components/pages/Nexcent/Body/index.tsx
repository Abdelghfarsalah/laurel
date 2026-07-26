import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogCard from "./BlogCard";
import CountCard from "./CountsCard";
import HomeBodyCard from "./HomeBodyCard";

export default function Body(){
    return <div >
    <HomeBodyCard title={"The unseen of spending three years at Pixelgrade"} subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio."} button={"Learn More"} image={"/images/home/body/Frame 35.png"} />
    <div className="mt-5 mb-10 ml-20 mr-10 block md:flex justify-between">
        <div>
            <p className="text-neutral-d-grey font-bold text-36 ">Helping a local </p>
            <p className="text-brand-primary font-bold text-36 ">business reinvent itself </p>
            <p className="text-brand-secondary  text-16 ">We reached here with our hard work and dedication</p>
        </div>
        <div className="grid  grid-cols-2 gap-4 md:mr-20 mt-10 md:mt-0">
            <CountCard image={"/images/home/body/Icon (2).png"} count={"2,245,341"} description={"Members"} />
            <CountCard image={"/images/home/body/Icon (3).png"} count={"46,328"} description={"Clubs"} />
            <CountCard image={"/images/home/body/Icon (4).png"} count={"828,867"} description={"Event Bookings"} />
            <CountCard image={"/images/home/body/Icon (5).png"} count={"1,926,436"} description={"Payments"} />
        </div>
    </div>
    <HomeBodyCard title={"How to design your site footer like we did"} subtitle={"Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida."} button={"Learn More"} image={"/images/home/body/pana.png"} />
     <div className="md:flex block justify-center mb-10 ml-5 sm:ml-30">
        <div className="flex justify-center flex-1 ">
            <Image
                className="w-full h-full object-contain"
                src={"/images/home/body/image 9.png"}
                alt="image not found"
                width={441}
                height={300}
            />
        </div>
        <div className="flex-3 ml-0 md:ml-10 mt-4 md:mt-0">
            <p className="text-14 mr-5   text-neutral-grey">Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.</p>
            <p className="text-brand-primary mt-2 text-20 ">Tim Smith</p>
            <p className="text-14 max-w-[50%] mt-2 mb-4 text-neutral-grey">British Dragon Boat Racing Association</p>
            <div className="flex items-center justify-between mr-5 ">
                <div className="flex flex-wrap  items-center ">
                    <Image  src={"/images/Clients/Logo.png"}     width={40} height={40}  alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/Clients/Logo (1).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/Clients/Logo (2).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/Clients/Logo (3).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/Clients/Logo (4).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/Clients/Logo (5).png"} width={40} height={40} alt="jhjhmbn" />
                    <Image className=" ml-6" src={"/images/Clients/Logo (6).png"} width={40} height={40} alt="jhjhmbn" />
                    </div>
                <div className="flex items-center ">
                <p className="text-brand-primary text-20 ">Meet all customers</p>
                <FaArrowRightLong className="ml-5 text-brand-primary"/>
                </div>
            </div>
        </div>
        </div>
    <div className=" flex flex-col w-full justify-center items-center">
        <p className="text-neutral-d-grey font-bold text-36">Caring is the new marketing</p>
        <p  className="text-neutral-grey max-w-[600px] text-16 mb-5 text-center">
            The Nexcent blog is the best place to read about the latest membership insights, trends and more. See who s joining the community, read about how our community are increasing their membership income and lot s more.​</p>
        <div className="md:flex mb-10 mt-5">
            <BlogCard image={"/images/home/body/image 18.png"} blog={"Creating Streamlined Safeguarding Processes with OneRen"} />
            <BlogCard image={"/images/home/body/image 19.png"} blog={"What are your safeguarding responsibilities and how can you manage them?"} />
            <BlogCard image={"/images/home/body/image 20.png"} blog={"Revamping the Membership Model with Triathlon Australia"} />
           
        </div>
    </div>
    </div>
}