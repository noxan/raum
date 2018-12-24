import uuid from 'uuid';
import { Action, Message } from '../shared/protocol';

export default class Store {
  state: { [key: string]: { [key: string]: {} } } = {};
  listeners: Array<({ action, model, data }: Message) => void> = [];

  update(model: string, id: string, data: object) {
    if (!this.state[model] || !this.state[model][id]) {
      throw new Error(`${model} with ${id} does not exist.`);
    }

    // make sure not to allow overrides of the id
    (data as any)._id = id;

    this.state[model][id] = Object.assign({}, this.state[model][id], data);
    this.notify(Action.UPDATE, model, this.state[model][id]);
  }

  insert(model: string, data: object) {
    const id = uuid.v4();

    if (!this.state[model]) {
      this.state[model] = {};
    }

    this.state[model][id] = { _id: id, ...data };
    this.notify(Action.INSERT, model, this.state[model][id]);
  }

  find(
    model: string,
    filter: (value: any, index: number, obj: {}[]) => boolean,
  ) {
    return Object.values(this.state[model]).find(filter);
  }

  delete(model: string, id: string) {
    const data = this.state[model][id];
    delete this.state[model][id];
    this.notify(Action.DELETE, model, data);
  }

  private notify(action: Action, model: string, data: object) {
    this.listeners.forEach(listener => listener({ action, model, data }));
  }

  subscribe(listener: ({ action, model, data }: Message) => void) {
    this.listeners.push(listener);
  }
}
