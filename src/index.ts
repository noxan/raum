import WebSocket from 'isomorphic-ws';
import { IncomingMessage } from 'http';

class Server {
  clientId = 0;
  clients: any = {};

  constructor() {
    const wss = new WebSocket.Server({ port: 4200 });

    wss.on('connection', (ws, req) => this.onConnection(ws, req));

    console.log('Server started at ws://127.0.0.1:4200');
  }

  onConnection(ws: WebSocket, req: IncomingMessage) {
    const name = `Client #${this.clientId++}`;
    console.log(`${name} (${req.connection.remoteAddress})`);

    const identifier = Symbol(name);
    this.clients[identifier] = { ws };

    ws.on('message', data => this.onMessage(ws, data));
    ws.on('close', (code, reason) => this.onClose(ws, code, reason));
  }

  onMessage(ws: WebSocket, data: WebSocket.Data) {
    console.log('onMessage', data);
  }

  onClose(ws: WebSocket, code: number, reason: string) {
    console.log('onClose', code, reason);
  }
}

new Server();
