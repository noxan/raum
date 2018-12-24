export enum Action {
  INSERT = 1,
  UPDATE = 2,
  FIND = 3,
  DELETE = 4,
}

export const encodeMessage = (action: Action, data?: object) => {
  return `${action}@${JSON.stringify(data)}`;
};
