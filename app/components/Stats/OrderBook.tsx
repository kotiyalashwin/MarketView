import { Depth } from "../../utils/types";
import Ask from "./Ask";
import Bids from "./Bids";

const OrderBook = ({ depth, price }: { depth: Depth; price: string }) => {
  return (
    <div className=" flex flex-col h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
      <div className="flex items-center justify-between sticky top-0 bg-[#1e1e1e] z-5 px-2 text-sm mb-2">
        <p>Price</p>
        <p>Size</p>
        <p>Total</p>
      </div>
      <div className="">
        <Ask asks={depth.asks} />
        <p className="text-2xl">{parseFloat(price).toFixed(3)}</p>
        <Bids bids={depth.bids} />
        {/* {depth.bids.map((bid, i) => (
          <div key={i} className="flex items-center justify-between">
            <p className="text-green-600">{parseFloat(bid[0]).toFixed(2)}</p>
            <p>{parseFloat(bid[1]).toFixed(2)}</p>
            <p>bid</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};
export default OrderBook;
