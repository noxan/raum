import WebSocket from 'isomorphic-ws';

import Socket from './socket';
import { encodeMessage, Action } from '../shared/protocol';

class Client extends Socket {
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
}

const client = new Client('ws://127.0.0.1:4200');

client.insert('user', { email: 'hello@world.com' });
