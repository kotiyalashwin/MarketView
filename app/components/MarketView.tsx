import { ArrowDown, ArrowUp } from "lucide-react";

import Link from "next/link";

const MarketView = ({
  price,
  symbol,
  isDown,
}: {
  price: string;
  symbol: string;
  isDown: boolean;
}) => {
  return (
    <Link href={`/trade/${symbol}`} className="bg-[#1e1e1e] px-2 py-4 ">
      <h1>
        {symbol.slice(0, -4)} - {symbol.slice(-4)}
      </h1>
      <p className={`${isDown ? "text-red-400 " : "text-green-400"} `}>
        ${parseFloat(price).toFixed(2)}
        {isDown ? <ArrowDown /> : <ArrowUp />}
      </p>
    </Link>
  );
};
export default MarketView;
