"use client";

import { useEffect, useRef, useState } from "react";
import {
  CandlestickData,
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  WhitespaceData,
} from "lightweight-charts";
import { getKlines } from "../utils/httpclient";
import { Candle } from "../utils/types";
import { ConnectionManager } from "../utils/ConnectionManager";

export const TradeView = ({ market }: { market: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    getKlines(market).then((res) => setCandles(res));

    ConnectionManager.getInstance().registerCallback(
      "kline",
      (data: Partial<Candle>) => {
        console.log(data);
        const parsedCandle: Candle = {
          time: data.time!,
          open: parseFloat(String(data.open!)),
          high: parseFloat(String(data.high!)),
          low: parseFloat(String(data.low!)),
          close: parseFloat(String(data.close!)),
          isClosed: data.isClosed!,
        };
        setCandles((prevCandles) => {
          const updatedCandles = [...prevCandles];
          const lastCandle = updatedCandles[updatedCandles.length - 1];
          if (lastCandle && lastCandle.time === parsedCandle.time) {
            updatedCandles[updatedCandles.length - 1] = parsedCandle;
          } else if (lastCandle && parsedCandle.time > lastCandle.time) {
            updatedCandles.push(parsedCandle);
            // if (updatedCandles.length > 500) { /* Optional: Limit array size */
            //   updatedCandles.shift();
            // }
          } else {
            console.warn(
              "Kline stream: Received an unexpected or out-of-order candle:",
              parsedCandle
            );
          }

          // updatedCandles.push(parsedCandle);

          return updatedCandles;
        });
      },
      market
    );

    ConnectionManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`${market.toLowerCase()}@kline_1h`],
    });

    return () => {
      ConnectionManager.getInstance().deRegisterCallback("klines", market);
      ConnectionManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`${market.toLowerCase()}@kline_1h`],
      });
    };
  }, [market]);

  useEffect(() => {
    console.log("candles changed");
    if (!chartContainerRef.current) return;

    const chart: IChartApi = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: "#1e1e1e" },
        textColor: "white",
      },
      grid: {
        vertLines: { color: "#444c56" },
        horzLines: { color: "#3a3f4b" },
      },
    });

    const candlestickSeries: ISeriesApi<"Candlestick"> =
      chart.addSeries(CandlestickSeries);

    const formatted = candles.map((c) => ({
      time: c.time,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    })) as (CandlestickData<Time> | WhitespaceData<Time>)[];

    candlestickSeries.setData(formatted);

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current!.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [candles]);
  return (
    <div className="pr-2 h-full">
      <div
        ref={chartContainerRef}
        className="h-full pt-4 w-full  rounded-md "
      ></div>
    </div>
  );
};
