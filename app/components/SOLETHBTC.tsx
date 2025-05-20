import { getMarket } from "../utils/httpclient";
import MarketView from "./MarketView";

export const Big3 = async () => {
  const market = await getMarket();
  const big3names = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];
  const big3 = market.filter((x) => big3names.includes(x.symbol));
  return (
    <div className="flex justify-between  items-center text-sm px-4 ">
      {/* <div className="flex items-center w-[65%]  ml-10"> */}
      {big3.map((el, i) => {
        const change = parseFloat(el.priceChangePercent);
        const isDown = change < 0;

        return (
          <MarketView
            classname="bg-transparent"
            key={i}
            isDown={isDown}
            price={el.lastPrice}
            symbol={el.symbol}
          />
        );
      })}
      {/* </div> */}
    </div>
  );
};
