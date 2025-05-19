export interface market {
  lastPrice: string;
  symbol: string;
  priceChangePercent: string;
}

export interface Depth {
  lastUpdateId: string;
  bids: [string, string][]; // array of arrays which contain two strings
  asks: [string, string][];
}
