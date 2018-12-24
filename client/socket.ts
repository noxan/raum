import WebSocket from 'isomorphic-ws';

export default class Socket {
  readonly address: string;
  private ws: WebSocket;

  constructor(address: string) {
    this.address = address;
    this.ws = this.setupSocket();
  }

  private setupSocket() {
    const ws = new WebSocket(this.address);

    ws.on('open', () => this.onOpen());

    ws.on('message', data => this.onMessage(data));

    ws.on('error', err => {
      if ((err as any).code === 'ECONNREFUSED') {
      } else {
        throw err;
      }
    });

    ws.on('close', (code: number, reason: string) => {
      if (code !== 1006) {
        console.log('Close', code, reason);
      }

      setTimeout(() => {
        console.debug('Trying reconnect.');
        this.ws = this.setupSocket();
      }, 1000);
    });

    return ws;
  }

  protected send(data: WebSocket.Data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      setTimeout(() => {
        this.send(data);
      }, 100);
    }
  }

  protected onOpen() {}

  protected onMessage(data: WebSocket.Data) {}
}
