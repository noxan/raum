import WebSocket from 'isomorphic-ws';

import {
  decodeMessage,
  Message,
  Action,
  encodeMessage,
} from '../shared/protocol';
import Server from './server';
import Store from './store';

class RaumServer extends Server {
  store: Store;

  constructor() {
    super();
    this.store = new Store();
    this.store.subscribe((message: Message) => this.onStoreChange(message));
  }

  onStoreChange({ action, model, data }: Message) {
    const pushAction = ({
      [Action.INSERT]: Action.PUSH_INSERT,
      [Action.UPDATE]: Action.PUSH_UPDATE,
      [Action.DELETE]: Action.PUSH_DELETE,
    } as any)[action];

    const message = encodeMessage(pushAction, model, data);
    this.broadcast(message);
  }

  onMessage(identifier: number, data: WebSocket.Data) {
    super.onMessage(identifier, data);

    try {
      const message = decodeMessage(data as string);
      this.switchMessage(identifier, message);
    } catch (err) {
      console.error(err);
    }
  }

  switchMessage(identifier: number, { action, model, data }: Message) {
    switch (action) {
      case Action.INSERT:
        this.store.insert(model, data);
        console.log(action, model, data);
        break;
      case Action.FIND:
        const modelData = this.store.find(model, () => true);
        console.log(action, model, data);
        const message = encodeMessage(Action.PUSH_FIND, model, modelData);
        this.send(message, identifier);
        break;
      default:
        console.error('Unknown action', action, model, data);
        break;
    }
  }
}

new RaumServer();
