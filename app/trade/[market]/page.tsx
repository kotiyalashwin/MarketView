"use client";
import { Stats } from "@/app/components/Stats/Stats";
import { useParams } from "next/navigation";

export default function Page() {
  const market = useParams().market as string;

  return (
    // Market Bar
    <div className="flex flex-col h-[80vh] lg:flex-row  border-t border-t-yellow-400/10">
      {/* chart */}
      <div className="md:w-[75vw] py-4">Here comes chart for {market}</div>

      <div className=" flex flex-col w-full lg:w-[25vw] h-full border-l-yellow-400/10 border-l pl-4 py-4 overflow-y-auto custom-scrollbar">
        <Stats market={market} />
        <div className="flex flex-col space-y-4">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 transition-all duration-[0.5s] w-full text-white">
            Buy
          </button>
          <button className="px-4 py-2 bg-red-600 w-full hover:bg-red-700 transition-all duration-[0.5s] text-white">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
