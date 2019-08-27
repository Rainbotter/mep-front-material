import { Api } from './api';

export interface Mep {

  id: string;
  name: string;
  project: string;
  version: string;
  closureDate: Date;
  creationDate: Date;
  lastModificationDate: Date;
  apis: Api[];

}
