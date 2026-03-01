import { ImageCardProps } from "@/types/global";
import Image from "next/image";

export default function ImageCard({
    imageSrc,
    alt,
    title,
    description,
    bottomElement,
    className = "",
    imagePriority = false,
    children,
}: ImageCardProps) {
    return (
        <div className={`relative w-full h-[35rem] group cursor-pointer overflow-hidden rounded-3xl ${className}`}>
            <Image
                fill
                src={imageSrc}
                alt={alt}
                className="object-cover group-hover:scale-[1.1] duration-500"
                sizes="50vw"
                priority={imagePriority}
            />
            <div className="p-[32px] absolute top-0 left-0">
                <h2 className="mb-[12px] font-fredoka text-white font-bold text-[3.5rem]">
                    {title}
                </h2>
                <p className="text-[1.5rem] font-poppins leading-[1.75rem] text-white">
                    {description}
                </p>
            </div>
            {bottomElement && (
                <div className="absolute bottom-0 left-0 p-[32px]">
                    {bottomElement}
                </div>
            )}
            {children}
        </div>
    );
}
