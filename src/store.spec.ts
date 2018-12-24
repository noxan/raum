import Store from './store';
import uuid from 'uuid';

uuid.v4 = jest.fn(() => '94d11a8a-fb8f-43cc-b124-289410da2a54');

const initStore = () => {
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
  return store;
};

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
  const store = initStore();
  expect(store.state).toMatchSnapshot();

  store.update('user', '94d11a8a-fb8f-43cc-b124-289410da2a54', {
    email: 'hello@example.com',
  });

  expect(Object.values(store.state)).toMatchSnapshot();
});

test('store.update() not override id', () => {
  const store = initStore();

  store.update('user', '94d11a8a-fb8f-43cc-b124-289410da2a54', {
    _id: 'this-is-a-weird-id',
  });

  expect(
    (Object.values(store.state)[0][
      '94d11a8a-fb8f-43cc-b124-289410da2a54'
    ] as any)._id,
  ).toEqual('94d11a8a-fb8f-43cc-b124-289410da2a54');
});

test('store.find()', () => {
  const store = initStore();

  const id = '94d11a8a-fb8f-43cc-b124-289410da2a54';
  const user = store.find('user', obj => obj._id === id);
  expect(user).toMatchSnapshot();
});
