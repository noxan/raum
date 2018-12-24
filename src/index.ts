import WebSocket from 'isomorphic-ws';

import Server from './server';

class RaumServer extends Server {
  onMessage(identifier: number, data: WebSocket.Data) {
    super.onMessage(identifier, data);

    super.broadcast(identifier, data);
  }
}

new RaumServer();
