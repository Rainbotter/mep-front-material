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

  // DOCKER ONLY
  appPort: string;
  dockerNode: string;
  dockerRunArgs: string;
  dockerToolboxVersion: string;

  // RANCHER ONLY
  namespace: string;
  branchName: string;
  tfsTeam: string;
  cluster: string;
  rancherProject: string;
  rancherEnv: string;
  rancherTemplate: string;

}
