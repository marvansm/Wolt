import {  HeadingProps } from "@/types/global";

export default function Heading({ title }: HeadingProps) {
  return (
    <h1 className="pb-[54px] text-white font-fredoka font-bold text-[3.5rem]">
      {title}
    </h1>
  );
}
