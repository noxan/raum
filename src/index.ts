import WebSocket from 'isomorphic-ws';

class Server {
  constructor() {
    const wss = new WebSocket.Server({ port: 4200 });

    wss.on('connection', this.onConnection);

    console.log('Server started at ws://127.0.0.1:4200');
  }

  onConnection(ws: WebSocket) {
    console.log('onConnection', (ws as any)._socket.address());
    ws.on('message', data => this.onMessage(ws, data));
  }

  onMessage(ws: WebSocket, data: WebSocket.Data) {
    console.log('onMessage', data);
  }
}

new Server();
