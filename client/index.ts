import WebSocket from 'isomorphic-ws';

import Socket from './socket';

class Client extends Socket {
  protected onOpen() {
    console.log('Websocket connected.');
    this.send('hi :wave:');
  }

  protected onMessage(data: WebSocket.Data) {
    console.log('Message.', data);
  }
}

new Client('ws://127.0.0.1:4200');
