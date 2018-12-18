import WebSocket from 'isomorphic-ws';

const ws = new WebSocket('ws://127.0.0.1:4200');

ws.on('open', () => {
  console.log('Websocket connected.');
  ws.send('hi :wave:');
});

ws.on('error', err => {
  console.log('Error', err);
});

ws.on('close', (code: number, reason: string) => {
  console.log('Close', code, reason);
});
