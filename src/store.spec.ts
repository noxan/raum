import Store from './store';
import uuid from 'uuid';

uuid.v4 = jest.fn(() => '94d11a8a-fb8f-43cc-b124-289410da2a54');

test('initialise store', () => {
  const store = new Store();
  expect(store).toBeDefined();
});

test('store.insert()', () => {
  const store = new Store();
  expect(store.state).toEqual({});
  store.insert('user', { email: 'richard@stromer.org', firstName: 'Richard' });
  expect(Object.values(store.state)).toMatchSnapshot();
});

test('store.update()', () => {
  const store = new Store();
  store.state = {
    user: {
      '94d11a8a-fb8f-43cc-b124-289410da2a54': {
        _id: '94d11a8a-fb8f-43cc-b124-289410da2a54',
        email: 'richard@stromer.org',
        firstName: 'Richard',
      },
    },
  };
  expect(store.state).toMatchSnapshot();

  store.update('user', '94d11a8a-fb8f-43cc-b124-289410da2a54', {
    email: 'hello@example.com',
  });

  expect(Object.values(store.state)).toMatchSnapshot();
});
