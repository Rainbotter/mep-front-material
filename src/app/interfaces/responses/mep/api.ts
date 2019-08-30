import { StepSet } from './step-set';

export interface Api {

  id?: string;
  name: string;
  maintainer: string;
  change?: string;
  comment?: string;
  dbUpdate?: string;
  dockerImage?: string;
  exposition?: string;
  newVersion: string;
  oldVersion: string;
  type: string; // RANCHER - DOCKER
  stepsets?: StepSet[];

}
