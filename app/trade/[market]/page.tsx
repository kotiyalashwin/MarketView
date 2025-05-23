import { Stats } from "@/app/components/Stats/Stats";
import TickerBar from "@/app/components/TickerBar";
import { TradeView } from "@/app/components/TradeView";

export default async function Page({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const market = (await params).market;
  return (
    <div>
      <div>
        <TickerBar market={market} />
      </div>
      <div className="flex flex-col lg:flex-row border-t border-t-yellow-400/10   ">
        {/* chart */}
        <div className="w-full lg:w-[70vw] py-4">
          <TradeView market={market} />
        </div>

        <div className=" flex flex-col w-full lg:w-[40vw] h-full border-l-yellow-400/10 border-l pl-4 py-4 overflow-y-auto custom-scrollbar mr-2">
          <Stats market={market} />
          {/* <div className="flex flex-col space-y-4">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 transition-all duration-[0.5s] w-full text-white">
              Buy
            </button>
            <button className="px-4 py-2 bg-red-600 w-full hover:bg-red-700 transition-all duration-[0.5s] text-white">
              Sell
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
