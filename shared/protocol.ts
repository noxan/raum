export enum Action {
  INSERT = 1,
  UPDATE = 2,
  FIND = 3,
  DELETE = 4,
  PUSH = 5,
}

const matchRegex = /^([0-9]+)@([a-z]+)@(\{.*\})$/;

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

  const action = parseInt(match[1], 10);
  const model = match[2];
  const data = JSON.parse(match[3]);

  return { action, model, data };
};
