import { ArrowDown, ArrowUp } from "lucide-react";

import Link from "next/link";

const MarketView = ({
  price,
  symbol,
  isDown,
  classname,
}: {
  price: string;
  symbol: string;
  isDown: boolean;
  classname?: string;
}) => {
  return (
    <Link
      href={`/trade/${symbol}`}
      className={`bg-[#1e1e1e] px-2 py-4  ${classname}`}
    >
      <h1>
        {symbol.slice(0, -4)} - {symbol.slice(-4)}
      </h1>
      <p
        className={`flex items-center ${
          isDown ? "text-red-400 " : "text-green-400"
        } `}
      >
        ${parseFloat(price).toFixed(2)}
        {isDown ? <ArrowDown size={20} /> : <ArrowUp />}
      </p>
    </Link>
  );
};
export default MarketView;
