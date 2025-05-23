import { Candle, Depth, Ticker } from "./types";

const cxnURL = "wss://stream.binance.com:9443/ws";

export class ConnectionManager {
  private static instance: ConnectionManager;
  private ws: WebSocket;

  //message goes here if connection not established but msg recieved
  // @ts-ignore
  private bufferMessages: any[];
  private id: number;
  private callbacks: { [type: string]: any[] } = {};
  // callback is a function passed from the frontend
  //{  "ticker" : [ { callback , id} , {callback , id}]  }
  private initialized: boolean = false; //default is false
  //singleton pattern
  //ensures only one instance is active
  static getInstance() {
    if (!this.instance) {
      this.instance = new ConnectionManager();
    }

    return this.instance;
  }

  //for new instance do :
  private constructor() {
    this.ws = new WebSocket(cxnURL);
    this.bufferMessages = [];
    this.id = 1;
    this.init();
  }

  //Read socket information
  init() {
    //when connected successfully
    this.ws.onopen = () => {
      this.initialized = true;
      //first clear all the buffer messages
      this.bufferMessages.forEach((msg) => {
        this.ws.send(JSON.stringify(msg));
      });

      this.bufferMessages = [];
    };

    //when message recieved
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      // console.log(msg);
      //collect for which is this
      //{e : "depth" , s :"solusdt" , b : [] , a : []}
      //type = depth,trade etc etc
      const type = msg.e; //aggTrade(for-trades)/depthUpdate-(for orderbook)/kline(@kline_1m)/24hrMiniTicker(for ticker)

      if (this.callbacks[type]) {
        this.callbacks[type].forEach(({ callback }) => {
          if (type === "24hrMiniTicker") {
            const newTicker: Partial<Ticker> = {
              symbol: msg.s,
              highPrice: msg.h,
              lowPrice: msg.l,
              lastPrice: msg.c,
              openPrice: msg.o,
              quoteVolume: msg.q,
              volume: msg.v,
            };

            callback(newTicker);
          }
          if (type === "depthUpdate") {
            const newDepth: Depth = {
              lastUpdateId: msg.e,
              bids: msg.b.slice(0, 11),
              asks: msg.a.slice(0, 11),
            };

            callback(newDepth);
          }
          if (type === "kline") {
            const newCandle: Partial<Candle> = {
              time: msg.k.t,
              open: msg.k.o,
              high: msg.k.h,
              low: msg.k.l,
              close: msg.k.c,
              isClosed: msg.k.x,
            };

            callback(newCandle);
          }
        });
      }
    };
  }

  sendMessage(message: any) {
    const msg = {
      ...message,
      id: this.id++,
    };

    //if connection is not done but message send then add to buffer
    if (!this.initialized) {
      this.bufferMessages.push(msg);
      return;
    }
    this.ws.send(JSON.stringify(msg));
  }

  async registerCallback(type: string, callback: any, id: string) {
    //set what to do
    // callback is a fn passed by frontend
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }

  async deRegisterCallback(type: string, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex((x) => x.id === id);
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}
