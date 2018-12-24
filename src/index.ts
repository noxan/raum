import WebSocket from 'isomorphic-ws';

import { decodeMessage, Message, Action } from '../shared/protocol';
import Server from './server';
import Store from './store';

class RaumServer extends Server {
  store = new Store();

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
    switch (action) {
      case Action.INSERT:
        this.store.insert(model, data);
        console.log(action, model, data);
        break;
      default:
        console.error('Unknown action', action, model, data);
        break;
    }
  }
}

new RaumServer();
