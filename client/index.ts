import WebSocket from 'isomorphic-ws';

class Client {
  private ws: WebSocket;

  constructor(address: string) {
    this.ws = new WebSocket(address);

    this.ws.on('open', () => {
      console.log('Websocket connected.');
      this.ws.send('hi :wave:');
    });

    this.ws.on('error', err => {
      console.log('Error', err);
    });

    this.ws.on('close', (code: number, reason: string) => {
      console.log('Close', code, reason);
    });
  }
}

new Client('ws://127.0.0.1:4200');
