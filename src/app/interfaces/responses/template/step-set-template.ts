import { StepTemplate } from './step-template';

export interface StepSetTemplate {

  id: string;
  name: string;
  order: string;
  steps: StepTemplate[];

}
