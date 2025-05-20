import axios from "axios";
import { Depth, market, Ticker, Trade } from "./types";

const BASE_URL = "https://api.binance.com/api/v3";

export const getMarket = async (): Promise<market[]> => {
  const popularSymbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "ADAUSDT",
    "XRPUSDT",
    "DOTUSDT",
    "DOGEUSDT",
    "AVAXUSDT",
    "MATICUSDT",
    "SHIBUSDT",
    "LTCUSDT",
    "UNIUSDT",
    "ATOMUSDT",
    "LINKUSDT",
    "ALGOUSDT",
    "VETUSDT",
    "FILUSDT",
    "ICPUSDT",
    "FTMUSDT",
    "TRXUSDT",
    "XLMUSDT",
    "THETAUSDT",
    "EOSUSDT",
  ];
  const response = await axios.get<market[]>(`${BASE_URL}/ticker/24hr`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data.filter((x) => popularSymbols.includes(x.symbol));
};

export const getDepth = async (symbol: string): Promise<Depth> => {
  const response = await axios.get(
    `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`
  );
  return response.data as Depth;
};

export const getTicker = async (symbol: string): Promise<Ticker> => {
  const resposne = await axios.get(
    `${BASE_URL}/ticker/price?symbol=${symbol.toUpperCase()}`
  );

  return resposne.data as Ticker;
};

export const getTrade = async (symbol: string): Promise<Trade[]> => {
  const response = await axios.get(
    `https://api.binance.com/api/v3/trades?symbol=${symbol.toUpperCase()}&limit=20`
  );

  return response.data as Trade[];
};
