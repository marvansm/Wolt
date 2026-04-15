import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-[#009de0] rounded-full blur-xl opacity-30 animate-pulse"></div>
          <Loader2 className="h-16 w-16 animate-spin text-[#009de0] relative z-10" strokeWidth={2.5} />
        </div>
        <p className="text-white font-poppins font-bold text-xl tracking-tight animate-pulse">Just a moment...</p>
      </div>
    </div>
  );
}
