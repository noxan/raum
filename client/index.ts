import WebSocket from 'isomorphic-ws';

const ws = new WebSocket('ws://127.0.0.1:4200');

ws.on('open', () => {
  console.log('Websocket connected.');
  ws.send('hi :wave:');
});
