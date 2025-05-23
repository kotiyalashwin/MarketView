import axios from "axios";
import { Candle, Depth, Ticker, Trade } from "./types";

const BASE_URL = "https://api.binance.com/api/v3";

//markets page
export const getMarket = async (): Promise<Ticker[]> => {
  const popularSymbols = [
    "BTCUSDC",
    "ETHUSDC",
    "BNBUSDC",
    "SOLUSDC",
    "ADAUSDC",
    "XRPUSDC",
    "DOTUSDC",
    "DOGEUSDC",
    "MATICUSDC",
    "LTCUSDC",
    "AVAXUSDC",
    "LINKUSDC",
    "SHIBUSDC",
    "UNIUSDC",
    "ATOMUSDC",
    "FTMUSDC",
    "ALGOUSDC",
    "NEARUSDC",
    "ICPUSDC",
    "FILUSDC",
    "TRXUSDC",
    "EOSUSDC",
    "XLMUSDC",
    "RUNEUSDC",
  ];
  const response = await axios.get<Ticker[]>(`${BASE_URL}/ticker/24hr`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data.filter((x) => popularSymbols.includes(x.symbol));
};

//orderbook
export const getDepth = async (symbol: string): Promise<Depth> => {
  const response = await axios.get(
    `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`
  );
  return response.data as Depth;
};

//Ticker Bar
export const getTicker = async (symbol: string): Promise<Ticker> => {
  const resposne = await axios.get(
    `${BASE_URL}/ticker/24hr?symbol=${symbol.toUpperCase()}`
  );

  return resposne.data as Ticker;
};

//trade
export const getTrade = async (symbol: string): Promise<Trade[]> => {
  const response = await axios.get(
    `https://api.binance.com/api/v3/trades?symbol=${symbol.toUpperCase()}&limit=20`
  );

  return response.data as Trade[];
};

//chart
export const getKlines = async (symbol: string): Promise<Candle[]> => {
  const response = await axios.get<any[]>(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h`
  );

  return response.data.map((c: any) => ({
    time: Math.floor(c[0] / 1000),
    open: parseFloat(c[1]),
    high: parseFloat(c[2]),
    low: parseFloat(c[3]),
    close: parseFloat(c[4]),
  }));
};
