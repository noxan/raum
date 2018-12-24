import uuid from 'uuid';

export default class Store {
  state: { [key: string]: { [key: string]: {} } } = {};

  update(model: string, id: string, data: object) {
    if (!this.state[model] || !this.state[model][id]) {
      throw new Error(`${model} with ${id} does not exist.`);
    }

    this.state[model][id] = Object.assign({}, this.state[model][id], data);
  }

  insert(model: string, data: object) {
    const id = uuid.v4();

    if (!this.state[model]) {
      this.state[model] = {};
    }

    this.state[model][id] = { _id: id, ...data };
  }

  find(
    model: string,
    filter: (value: any, index: number, obj: {}[]) => boolean,
  ) {
    return Object.values(this.state[model]).find(filter);
  }
}
