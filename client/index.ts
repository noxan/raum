import WebSocket from 'isomorphic-ws';

import Socket from './socket';
import {
  encodeMessage,
  Action,
  decodeMessage,
  Message,
} from '../shared/protocol';

type ModelListener = (state: any, data: Array<any>) => void;

enum ModelState {
  READY = 'READY',
  LOADING = 'LOADING',
}

class Client extends Socket {
  private listeners: { [key: string]: Array<ModelListener> } = {};
  private store: { [key: string]: { [key: string]: {} } } = {};

  private addListener(model: string, listener: ModelListener) {
    if (this.listeners[model]) {
      this.listeners[model].push(listener);
    } else {
      this.listeners[model] = [listener];
    }
  }

  protected onOpen() {
    console.log('Websocket connected.');
  }

  protected onMessage(data: WebSocket.Data) {
    try {
      const message = decodeMessage(data as string);
      this.switchMessage(message);
    } catch (err) {
      console.error(err);
    }
  }

  protected switchMessage({ action, model, data }: Message) {
    switch (action) {
      case Action.PUSH_FIND:
        const tmp: Array<object> =
          data instanceof Array ? (data as Array<object>) : [data];
        tmp.forEach((entry: any) => {
          this.store[model][entry._id] = entry;
        });
        this.listeners[model].forEach(listener =>
          listener(ModelState.READY, Object.values(this.store[model])),
        );
        break;
      case Action.PUSH_INSERT:
        this.store[model][(data as any)._id] = data;
        this.listeners[model].forEach(listener =>
          listener(ModelState.READY, Object.values(this.store[model])),
        );
        break;
      default:
        console.error('Unknown action', action, model, data);
        break;
    }
  }

  insert(model: string, data: object) {
    const message = encodeMessage(Action.INSERT, model, data);
    this.send(message);
  }

  subscribe(model: string, listener: ModelListener) {
    this.addListener(model, listener);
    if (!this.store[model]) {
      this.store[model] = {};
      const message = encodeMessage(Action.FIND, model);
      this.send(message);
    }
  }
}

const client = new Client('ws://127.0.0.1:4200');

client.insert('user', { email: 'hello@world.com' });

client.subscribe('user', (state, users) => {
  console.log(state, users);
});
