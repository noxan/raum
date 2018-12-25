export enum Action {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  FIND = 'FIND',
  DELETE = 'DELETE',
  PUSH_INSERT = 'PUSH_INSERT',
  PUSH_UPDATE = 'PUSH_UPDATE',
  PUSH_FIND = 'PUSH_FIND',
  PUSH_DELETE = 'PUSH_DELETE',
}

export interface Message {
  action: Action;
  model: string;
  data: object;
}

const matchRegex = /^([A-Z_]+)@([a-z]+)@([\[\{].*[\]\}])$/;

export const encodeMessage = (
  action: Action,
  model: string,
  data: object = {},
) => {
  return `${action}@${model}@${JSON.stringify(data)}`;
};

export const decodeMessage = (message: string) => {
  const match = message.match(matchRegex);
  if (!match) {
    throw new Error(`Could not parse message: ${message}`);
  }

  const action: Action = Action[match[1] as any] as Action;
  const model = match[2];
  const data = JSON.parse(match[3]);

  return { action, model, data };
};
