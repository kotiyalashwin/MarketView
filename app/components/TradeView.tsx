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

export const TradeView = ({ market }: { market: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getKlines(market);
      setCandles(data);
    }

    fetchData();
  }, [market]);

  useEffect(() => {
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
      <div ref={chartContainerRef} className="h-full w-full rounded-md "></div>
    </div>
  );
};
