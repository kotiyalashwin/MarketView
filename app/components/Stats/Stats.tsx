"use client";
import { useEffect, useState } from "react";
import { getDepth, getTicker } from "../../utils/httpclient";
import { Depth } from "../../utils/types";
import OrderBook from "./OrderBook";

export const Stats = ({ market }: { market: string }) => {
  const [activeTab, setActiveTab] = useState<"book" | "trade">("book");
  const [depth, setDepth] = useState<Depth | null>(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    getDepth(market).then((res) => setDepth(res));
    getTicker(market).then((res) => setPrice(res.price));
  }, [market]);

  return (
    <div className="h-full ">
      <div className="flex  justify-evenly items-center">
        <button
          className="bg-gray-600/30 hover:bg-gray-600/20 transition-all duration-[0.25s] px-4 py-2 rounded-lg"
          onClick={() => setActiveTab("book")}
        >
          Book
        </button>
        <button
          className="bg-gray-600/30 px-4 py-2 rounded-lg hover:bg-gray-600/20 transition-all duration-[0.25s]"
          onClick={() => setActiveTab("trade")}
        >
          Trade
        </button>
      </div>

      <div className="h-full py-4 ">
        {activeTab === "book" && depth && (
          <OrderBook depth={depth} price={price} />
        )}
        {activeTab === "trade" && "Trade"}
      </div>
    </div>
  );
};
