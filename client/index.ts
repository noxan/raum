import WebSocket from 'isomorphic-ws';

class Client {
  constructor(address: string) {
    const ws = new WebSocket(address);

    ws.on('open', () => {
      console.log('Websocket connected.');
      ws.send('hi :wave:');
    });

    ws.on('error', err => {
      console.log('Error', err);
    });

    ws.on('close', (code: number, reason: string) => {
      console.log('Close', code, reason);
    });
  }
}

new Client('ws://127.0.0.1:4200');
