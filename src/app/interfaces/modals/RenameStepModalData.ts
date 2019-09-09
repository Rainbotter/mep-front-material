import { Template } from '../responses/template/template';
import { StepSetTemplate } from '../responses/template/step-set-template';
import { StepTemplate } from '../responses/template/step-template';

export interface RenameStepModalData {

  template: Template;
  stepSet: StepSetTemplate;
  step: StepTemplate;

}
