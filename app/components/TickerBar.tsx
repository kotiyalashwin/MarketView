import { getTicker } from "../utils/httpclient";

const TickerBar = async ({ market }: { market: string }) => {
  const TickerData = await getTicker(market);
  const isPositive = parseFloat(TickerData.priceChange) > 0;
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
            {parseFloat(TickerData.lastPrice).toFixed(2)}
          </p>
          <p className="text-sm">
            ${parseFloat(TickerData.lastPrice).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col ">
          <p className="text-neutral-400 text-sm">24H Change</p>
          <p
            className={`flex ${isPositive ? "text-green-400" : "text-red-400"}`}
          >
            {isPositive ? "+" : "-"}
            {parseFloat(TickerData.priceChange).toFixed(2)}{" "}
            {isPositive ? "+" : "-"}
            {parseFloat(TickerData.priceChangePercent).toFixed(2)}%
          </p>
        </div>
        <div className="flex flex-col  ">
          <p className="text-neutral-400 text-sm">24H High</p>
          <p>{parseFloat(TickerData.highPrice).toFixed(2)}</p>
        </div>
        <div className="flex flex-col ">
          <p className="text-neutral-400 text-sm">24H Low</p>
          <p>{parseFloat(TickerData.lowPrice).toFixed(2)}</p>
        </div>
        <div className="flex flex-col  ">
          <p className="text-neutral-400 text-sm">24H Volume(USDC)</p>
          <p>{parseFloat(TickerData.quoteVolume).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
export default TickerBar;
