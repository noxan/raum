import WebSocket from 'isomorphic-ws';

class Socket {
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

  onOpen() {
    console.log('Websocket connected.');
    this.ws.send('hi :wave:');
  }

  onMessage(data: WebSocket.Data) {
    console.log('Message.', data);
  }
}

new Socket('ws://127.0.0.1:4200');
