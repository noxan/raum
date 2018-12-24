export enum Action {
  INSERT = 1,
  UPDATE = 2,
  FIND = 3,
  DELETE = 4,
}

const matchRegex = /^([0-9]+)@(\{.*\})$/;

export const encodeMessage = (action: Action, data: object = {}) => {
  return `${action}@${JSON.stringify(data)}`;
};

export const decodeMessage = (message: string) => {
  const match = message.match(matchRegex);
  if (!match) {
    throw new Error(`Could not parse message: ${message}`);
  }

  const action = parseInt(match[1], 10);
  const data = JSON.parse(match[2]);

  return { action, data };
};
