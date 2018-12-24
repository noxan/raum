import { Action, encodeMessage } from './protocol';

test('encodeMessage', () => {
  const message = encodeMessage(Action.INSERT);
  expect(message).toMatchSnapshot();
});
