const cxnURL = "wss://stream.binance.com:9443/ws";

export class ConnectionManager {
  private static instance: ConnectionManager;
  private ws: WebSocket;
  //message goes here if connection not established but msg recieved
  private bufferMessage: [];
  private id: number;
  private callbacks: { [type: string]: any[] } = {};
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
    this.bufferMessage = [];
    this.id = 1;
    this.init();
  }

  //Read socket information
  init() {
    //when connected successfully
    this.ws.onopen = () => {
      this.initialized = true;
      //first clear all the buffer messages
      this.bufferMessage.forEach((msg) => {
        this.ws.send(JSON.stringify(msg));
      });

      this.bufferMessage = [];
    };

    //when message recieved
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      //collect for which is this
      //{e : "depth" , s :"solusdt" , b : [] , a : []}
      //type = depth,trade etc etc
      const type = msg.data.e; //aggTrade(for-trades)/depthUpdate-(for orderbook)/kline(@kline_1m)/24hrMiniTicker(for ticker)
    };
  }
}
