"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Appbar = () => {
  const pathname = usePathname();

  return (
    <header>
      <nav className="py-4 px-3 flex items-center justify-start gap-8 bg-slate-600/5 backdrop-blur-2xl">
        <Link href={"/"} className="text-xl ">
          Exchange
        </Link>
        <Link
          className={`${
            pathname === "/market" ? "text-yellow-400" : "text-neutral-400"
          }`}
          href={"/market"}
        >
          Market
        </Link>
        <Link
          className={`${
            pathname.startsWith("/trade")
              ? "text-yellow-400"
              : "text-neutral-400"
          }`}
          href={"/trade/SOL_USDC"}
        >
          Trade
        </Link>
      </nav>
    </header>
  );
};
export default Appbar;
