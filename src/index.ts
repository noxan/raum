import WebSocket from 'isomorphic-ws';

import { decodeMessage, Message } from '../shared/protocol';
import Server from './server';

class RaumServer extends Server {
  onMessage(identifier: number, data: WebSocket.Data) {
    super.onMessage(identifier, data);

    try {
      const message = decodeMessage(data as string);
      this.switchMessage(message);
    } catch (err) {
      console.error(err);
    }
  }

  switchMessage({ action, model, data }: Message) {
    console.log(action, model, data);
  }
}

new RaumServer();
