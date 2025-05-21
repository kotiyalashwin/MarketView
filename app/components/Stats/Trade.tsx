"use client";

import { formatDate } from "@/app/utils/formatdate";
import { Trade } from "@/app/utils/types";
import { useState } from "react";

const Trades = ({ trades, market }: { trades: Trade[]; market: string }) => {
  const [active, setActive] = useState<"base" | "quote">("base");

  return (
    <div className=" flex flex-col h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
      <div className="flex items-center justify-between sticky top-0 bg-[#1e1e1e] z-5 px-2 py-[4px] text-sm mb-2">
        <p>Price(USTD)</p>
        <p
          className="cursor-pointer mr-10"
          onClick={() => {
            if (active === "base") {
              setActive("quote");
            } else {
              setActive("base");
            }
          }}
        >
          Qty(
          <span className="text-yellow-400">
            {active === "base"
              ? `${market.slice(0, -4)}`
              : `${market.slice(-4)}`}
          </span>
          )
        </p>
        <p>{""}</p>
      </div>
      <div>
        {trades.map((trade, i) => {
          const tradeColor = trade.isBuyerMaker
            ? "text-red-600"
            : "text-green-600";
          return (
            <div
              key={i}
              className="w-full flex items-center justify-between pl-6"
            >
              <p className={`${tradeColor} font-bold text-sm`}>
                {parseFloat(trade.price).toFixed(3)}
              </p>
              <p>
                {active === "base"
                  ? parseFloat(trade.qty).toFixed(2)
                  : parseFloat(trade.quoteQty).toFixed(2)}
              </p>
              <p className="text-neutral-400">
                {formatDate(trade.time).split(" ")[0]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Trades;
