import { Action, encodeMessage, decodeMessage } from './protocol';

test('encodeMessage', () => {
  const message = encodeMessage(Action.INSERT);
  expect(message).toMatchSnapshot();
});

test('decodeMessage', () => {
  const message = decodeMessage('1@{}');
  expect(message).toMatchSnapshot();
});
