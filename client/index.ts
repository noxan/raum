import WebSocket from 'isomorphic-ws';

import Socket from './socket';
import { encodeMessage, Action } from '../shared/protocol';

type ModelListener = (state: any, data: Array<any>) => void;

enum ModelState {
  READY = 'READY',
  LOADING = 'LOADING',
}

class Client extends Socket {
  private listeners: { [key: string]: Array<ModelListener> } = {};
  private store: { [key: string]: {} } = {};

  private addListener(model: string, listener: ModelListener) {
    if (this.listeners[model]) {
      this.listeners[model].push(listener);
    } else {
      this.listeners[model] = [];
    }
  }

  protected onOpen() {
    console.log('Websocket connected.');
    this.send('hi :wave:');
  }

  protected onMessage(data: WebSocket.Data) {
    console.log('Message.', data);
  }

  insert(model: string, data: object) {
    const message = encodeMessage(Action.INSERT, model, data);
    this.send(message);
  }

  subscribe(model: string, listener: ModelListener) {
    this.addListener(model, listener);
    if (this.store[model]) {
      listener(ModelState.READY, Object.values(this.store[model]));
    } else {
      this.store[model] = {};
      const message = encodeMessage(Action.FIND, model);
      this.send(message);
      listener(ModelState.LOADING, Object.values(this.store[model]));
    }
  }
}

const client = new Client('ws://127.0.0.1:4200');

client.insert('user', { email: 'hello@world.com' });

client.subscribe('user', (state, users) => {
  console.log(state, users);
});
