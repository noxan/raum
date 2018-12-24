import WebSocket from 'isomorphic-ws';
import { IncomingMessage } from 'http';

export default class Server {
  clientId = 0;
  clients: { [key: number]: { ws: WebSocket; name: string } } = {};

  constructor() {
    const wss = new WebSocket.Server({ port: 4200 });

    wss.on('connection', (ws, req) => this.onConnection(ws, req));

    console.log('Server started at ws://127.0.0.1:4200');
  }

  onConnection(ws: WebSocket, req: IncomingMessage) {
    const clientId = this.clientId++;
    const client = {
      ws,
      name: `Client #${clientId}`,
    };
    console.log(client.name, 'connect', req.connection.remoteAddress);

    this.clients[clientId] = client;

    ws.on('message', data => this.onMessage(clientId, data));
    ws.on('close', (code, reason) => this.onClose(clientId, code, reason));
  }

  onMessage(clientId: number, data: WebSocket.Data) {
    const client = this.clients[clientId];
    console.log(client.name, 'message', data);
  }

  onClose(clientId: number, code: number, reason: string) {
    const client = this.clients[clientId];
    console.log(client.name, 'close', code, reason);
  }
}
