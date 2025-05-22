import { TrendingUp } from "lucide-react";
import { getMarket } from "../utils/httpclient";
import MarketView from "../components/MarketView";

export default async function Page() {
  const market = await getMarket();
  return (
    <div className="py-4 px-4 flex flex-col">
      <div>
        <h1 className="text-2xl flex items-center gap-4 ">
          {" "}
          <TrendingUp /> Trending Now
        </h1>
        <p className="text-neutral-400">24 big runners of the market</p>
      </div>
      <div className="mt-4 px-2 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {market.map((el, i) => {
            const change = parseFloat(el.priceChangePercent);
            const isDown = change < 0;
            return (
              <MarketView
                key={i}
                price={el.lastPrice}
                isDown={isDown}
                symbol={el.symbol}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
