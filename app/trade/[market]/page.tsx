"use client";
import { getDepth } from "@/app/utils/httpclient";
import { Depth } from "@/app/utils/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const market = useParams().market as string;
  const [depth, setDepth] = useState<Depth | null>(null);

  useEffect(() => {
    getDepth(market).then((res) => setDepth(res));
  }, [market]);

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
