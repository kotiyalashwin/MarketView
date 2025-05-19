"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { market } = useParams();
  return (
    // Market Bar
    <div className="flex flex-col lg:flex-row h-fulll py-4">
      {/* chart */}
      <div className="h-screen md:w-[70vw]">Here comes chart for {market}</div>

      <div className="">
        Swap and stats
        {/* stats */}
        {/*  Swap*/}
      </div>
    </div>
  );
}
