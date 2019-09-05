import { Api } from './api';

export interface Mep {

  id?: string;
  name?: string;
  project?: string;
  version?: string;
  dueDate?: Date;
  closureDate?: Date;
  creationDate?: Date;
  lastModificationDate?: Date;
  templateId?: string;
  apis?: Api[];

}
