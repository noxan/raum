import WebSocket from 'isomorphic-ws';

const wss = new WebSocket.Server({ port: 4200 });
console.log('Server started at ws://127.0.0.1:4200');
