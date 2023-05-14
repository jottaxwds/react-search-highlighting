export type CheckOption = {
  name: string;
  displayValue: string;
  value: string;
};

export type CheckChangeEventArg = {
  id: string;
  value: string;
  checked: boolean;
};
