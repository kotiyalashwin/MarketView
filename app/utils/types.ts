export interface Depth {
  lastUpdateId: string;
  bids: [string, string][]; // array of arrays which contain two strings
  asks: [string, string][];
}

export interface Ticker {
  lastPrice: string;
  symbol: string;
  //firstprice
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  // trades
  count: number;
  volume: string;
  //can add more data here
}

export interface Trade {
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}
