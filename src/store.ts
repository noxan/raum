import uuid from 'uuid';

export default class Store {
  state: { [key: string]: { [key: string]: {} } } = {};

  insert(model: string, data: object) {
    const id = uuid.v4();

    if (!this.state[model]) {
      this.state[model] = {};
    }

    this.state[model][id] = { _id: id, ...data };
  }
}
