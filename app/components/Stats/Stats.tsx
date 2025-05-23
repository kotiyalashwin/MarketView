"use client";
import { useEffect, useState } from "react";
import { getDepth, getTicker, getTrade } from "../../utils/httpclient";
import { Depth, Ticker, Trade } from "../../utils/types";
import OrderBook from "./OrderBook";
import Trades from "./Trade";
import { ConnectionManager } from "@/app/utils/ConnectionManager";
import { mergeOrderBook } from "@/app/utils/MergerOrderBook";

export const Stats = ({ market }: { market: string }) => {
  const [activeTab, setActiveTab] = useState<"book" | "trade">("book");
  const [depth, setDepth] = useState<Depth | null>(null);
  const [price, setPrice] = useState("");
  const [trades, setTrades] = useState<Trade[] | null>(null);

  useEffect(() => {
    getDepth(market).then((res) => setDepth(res));
    getTicker(market).then((res) => setPrice(res.lastPrice));
    getTrade(market).then((res) => setTrades(res));

    const updateDepth = (data: Depth) => {
      setDepth((prev) => {
        if (!prev) return null;

        const mergedBids = mergeOrderBook(prev.bids, data.bids);
        const mergedAsks = mergeOrderBook(prev.asks, data.asks);

        return {
          lastUpdateId: data.lastUpdateId,
          bids: mergedBids.slice(0, 11),
          asks: mergedAsks.slice(0, 11),
        };
      });
    };

    ConnectionManager.getInstance().registerCallback(
      "depthUpdate",
      updateDepth,
      market
    );

    ConnectionManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market.toLowerCase()}@depth`],
    });

    ConnectionManager.getInstance().registerCallback(
      "24hrMiniTicker",
      (data: Partial<Ticker>) => {
        setPrice((prev) => data.lastPrice ?? prev ?? "");
      },
      market
    );

    return () => {
      ConnectionManager.getInstance().deRegisterCallback("depthUpdate", market);
      ConnectionManager.getInstance().deRegisterCallback(
        "24hrMiniTicker",
        market
      );

      ConnectionManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market.toLowerCase()}@depth`],
      });
    };
  }, [market]);

  return (
    <div className="h-full">
      <div className="flex  justify-evenly items-center">
        <button
          className={`${
            activeTab === "book" ? "bg-gray-600/30" : ""
          }  transition-all duration-[0.25s] px-4 py-2 rounded-lg hover:text-white/75`}
          onClick={() => setActiveTab("book")}
        >
          Book
        </button>
        <button
          className={`${
            activeTab === "trade" ? "bg-gray-600/30" : ""
          }  transition-all duration-[0.25s] px-4 py-2 rounded-lg hover:text-white/75`}
          onClick={() => setActiveTab("trade")}
        >
          Trade
        </button>
      </div>

      <div className="h-full py-4 ">
        {activeTab === "book" && depth && (
          <OrderBook depth={depth} price={price} />
        )}
        {activeTab === "trade" && trades && (
          <Trades trades={trades} market={market} />
        )}
      </div>
    </div>
  );
};
