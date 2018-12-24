import { Action, encodeMessage, decodeMessage } from './protocol';

test('encodeMessage', () => {
  const message = encodeMessage(Action.INSERT, 'user');
  expect(message).toMatchSnapshot();
});

test('decodeMessage', () => {
  const message = decodeMessage('1@user@{}');
  expect(message).toMatchSnapshot();
});
