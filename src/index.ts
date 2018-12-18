import WebSocket from 'isomorphic-ws';
import { IncomingMessage } from 'http';

class Server {
  constructor() {
    const wss = new WebSocket.Server({ port: 4200 });

    wss.on('connection', (ws, req) => this.onConnection(ws, req));

    console.log('Server started at ws://127.0.0.1:4200');
  }

  onConnection(ws: WebSocket, req: IncomingMessage) {
    console.log(`Client (${req.connection.remoteAddress})`);
    ws.on('message', data => this.onMessage(ws, data));
  }

  onMessage(ws: WebSocket, data: WebSocket.Data) {
    console.log('onMessage', data);
  }
}

new Server();
