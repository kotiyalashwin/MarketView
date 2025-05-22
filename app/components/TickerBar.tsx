"use client";
import { useEffect, useState } from "react";
import { getTicker } from "../utils/httpclient";
import { Ticker } from "../utils/types";
import { ConnectionManager } from "../utils/ConnectionManager";

const TickerBar = ({ market }: { market: string }) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(market).then((res) => setTicker(res));
    //register what to do when recieved message
    ConnectionManager.getInstance().registerCallback(
      "24hrMiniTicker",
      (data: Partial<Ticker>) => {
        setTicker((prev) => ({
          symbol: data?.symbol ?? prev?.symbol ?? "",
          count: Number(data?.count) ?? prev?.count ?? 0,
          highPrice: data?.highPrice ?? prev?.highPrice ?? "",
          lowPrice: data?.lowPrice ?? prev?.lowPrice ?? "",
          lastPrice: data?.lastPrice ?? prev?.lastPrice ?? "",
          openPrice: data?.openPrice ?? prev?.openPrice ?? "",
          priceChange: data?.priceChange ?? prev?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prev?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prev?.quoteVolume ?? "",
          volume: data?.volume ?? prev?.volume ?? "",
        }));
      },
      market
    );
    //connect to ticker
    ConnectionManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market.toLowerCase()}@miniTicker`],
    });

    return () => {
      //once we leave the page, de-register the callback for this type
      ConnectionManager.getInstance().deRegisterCallback(
        "24hrMiniTicker",
        market
      );
      //once we leave the page unsubscribe from the ws
      ConnectionManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market.toLowerCase()}@miniTicker`],
      });
    };
  }, [market]);

  if (!ticker) {
    return <h1>Unable To get Data for now</h1>;
  }

  const isPositive = parseFloat(ticker.priceChange) > 0;
  return (
    <div className="text-sm md:text-xl md:py-4 flex items-center md:pl-10  overflow-x-auto  bg-[#1e1e1e] ">
      <div className="bg-neutral-800 border-yellow-400/20 border-2  py-2 text-lg px-2 rounded-xl">
        <span>{market.slice(0, -4)}</span>
        <span className="text-neutral-400">/{market.slice(-4)}</span>
      </div>
      <div className="flex items-center w-[40%] md:[50%] justify-between space-x-8 ml-10 ">
        <div className=" flex flex-col">
          <p
            className={`text-xl ${
              isPositive ? "text-green-400" : "text-red-600"
            }`}
          >
            {parseFloat(ticker.lastPrice).toFixed(2)}
          </p>
          <p className="text-sm">${parseFloat(ticker.lastPrice).toFixed(2)}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-neutral-400 text-sm">24H Change</p>
          <p
            className={`flex ${isPositive ? "text-green-400" : "text-red-400"}`}
          >
            {isPositive ? "+" : "-"}
            {parseFloat(ticker.priceChange).toFixed(2)} {isPositive ? "+" : "-"}
            {parseFloat(ticker.priceChangePercent).toFixed(2)}%
          </p>
        </div>
        <div className="flex flex-col  ">
          <p className="text-neutral-400 text-sm">24H High</p>
          <p>{parseFloat(ticker.highPrice).toFixed(2)}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-neutral-400 text-sm">24H Low</p>
          <p>{parseFloat(ticker.lowPrice).toFixed(2)}</p>
        </div>
        <div className="flex flex-col  ">
          <p className="text-neutral-400 text-sm">24H Volume(USDC)</p>
          <p>{parseFloat(ticker.quoteVolume).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
export default TickerBar;
