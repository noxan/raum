import WebSocket from 'isomorphic-ws';

import { decodeMessage, Action } from '../shared/protocol';
import Server from './server';

const switchMessage = ({
  action,
  model,
  data,
}: {
  action: Action;
  model: string;
  data: Object;
}) => {
  console.log(action, model, data);
};

class RaumServer extends Server {
  onMessage(identifier: number, data: WebSocket.Data) {
    super.onMessage(identifier, data);

    try {
      const message = decodeMessage(data as string);
      switchMessage(message);
    } catch (err) {
      console.error(err);
    }
  }
}

new RaumServer();
