import WebSocket from 'isomorphic-ws';

import Server from './server';

class RaumServer extends Server {
  onMessage(identifier: symbol, data: WebSocket.Data) {
    super.onMessage(identifier, data);

    super.broadcast(identifier, data);
  }
}

new RaumServer();
