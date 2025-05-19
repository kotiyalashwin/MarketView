import axios from "axios";
import { market } from "./types";

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
