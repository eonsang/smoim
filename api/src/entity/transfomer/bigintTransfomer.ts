import { ValueTransformer } from 'typeorm';

export const bigintTransfomer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string): number => parseInt(value, 10),
};
