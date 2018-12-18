import WebSocket from 'isomorphic-ws';

class Client {
  readonly address: string;
  private ws: WebSocket;

  constructor(address: string) {
    this.address = address;
    this.ws = this.setupSocket();
  }

  private setupSocket() {
    const ws = new WebSocket(this.address);

    ws.on('open', () => {
      console.log('Websocket connected.');
      ws.send('hi :wave:');
    });

    ws.on('error', err => {
      console.log('Error', err);
    });

    ws.on('close', (code: number, reason: string) => {
      console.log('Close', code, reason);

      setTimeout(() => {
        this.ws = this.setupSocket();
      }, 1000);
    });

    return ws;
  }
}

new Client('ws://127.0.0.1:4200');
