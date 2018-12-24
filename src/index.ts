import WebSocket from 'isomorphic-ws';

import { decodeMessage } from '../shared/protocol';
import Server from './server';

class RaumServer extends Server {
  onMessage(identifier: number, data: WebSocket.Data) {
    super.onMessage(identifier, data);

    try {
      const message = decodeMessage(data as string);
      console.log(message);
    } catch (err) {
      console.error(err);
    }

    // super.broadcast(identifier, data);
  }
}

new RaumServer();
