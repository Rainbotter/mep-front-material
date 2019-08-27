import { StepSet } from './step-set';

export interface Api {

  id: string;
  change: string;
  comment: string;
  dbUpdate: string;
  dockerImage: string;
  exposition: string;
  maintainer: string;
  name: string;
  newVersion: string;
  oldVersion: string;
  type: string; // RANCHER - DOCKER
  stepsets: StepSet[];

}
