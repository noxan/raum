import WebSocket from 'isomorphic-ws';
import { IncomingMessage } from 'http';

export default class Server {
  clientId = 0;
  clients: any = {};

  constructor() {
    const wss = new WebSocket.Server({ port: 4200 });

    wss.on('connection', (ws, req) => this.onConnection(ws, req));

    console.log('Server started at ws://127.0.0.1:4200');
  }

  onConnection(ws: WebSocket, req: IncomingMessage) {
    const client = {
      ws,
      name: `Client #${this.clientId++}`,
    };
    console.log(client.name, 'connect', req.connection.remoteAddress);

    const identifier = Symbol(client.name);
    this.clients[identifier] = client;

    ws.on('message', data => this.onMessage(identifier, data));
    ws.on('close', (code, reason) => this.onClose(identifier, code, reason));
  }

  onMessage(identifier: symbol, data: WebSocket.Data) {
    const client = this.clients[identifier];
    console.log(client.name, 'message', data);
  }

  onClose(identifier: symbol, code: number, reason: string) {
    const client = this.clients[identifier];
    console.log(client.name, 'close', code, reason);
  }
}
