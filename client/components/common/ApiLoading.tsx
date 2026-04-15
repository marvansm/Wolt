import { Loader2 } from "lucide-react";

export default function ApiLoading({ text = "Loading items..." }: { text?: string }) {
  return (
    <div className="w-full flex-col flex items-center justify-center py-12">
      <div className="relative bg-[#0a0a0a] p-8 rounded-[32px] border border-white/5 shadow-2xl flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#009de0]" />
        <span className="text-[#a3a3a3] font-poppins font-medium text-sm animate-pulse">{text}</span>
      </div>
    </div>
  );
}
