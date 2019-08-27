import { Step } from './step';

export interface StepSet {

  id: string;
  name: string;
  order: number;
  steps: Step[];

}
