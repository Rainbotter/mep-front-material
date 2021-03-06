import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() {
  }

  public getTemplatesUrl(): string {
    return `${environment.apiUrl}${environment.paths.templates}`;
  }

  public getTemplateUrl(templateId: string): string {
    return this.getTemplatesUrl() + '/' + templateId;
  }

  public getTemplateStepSetsUrl(templateId: string): string {
    return this.getTemplateUrl(templateId) + '/stepsets';
  }

  public getTemplateStepSetUrl(templateId: string, stepSetId: string): string {
    return this.getTemplateStepSetsUrl(templateId) + '/' + stepSetId;
  }

  public getTemplateStepSetRenameUrl(templateId: string, stepSetId: string): string {
    return this.getTemplateStepSetUrl(templateId, stepSetId) + '/name';
  }

  public getTemplateStepsUrl(templateId: string, stepSetId: string): string {
    return this.getTemplateStepSetUrl(templateId, stepSetId) + '/steps';
  }

  public getTemplateStepUrl(templateId: string, stepSetId: string, stepId: string): string {
    return this.getTemplateStepsUrl(templateId, stepSetId) + '/' + stepId;
  }

  public getTemplateStepRenameUrl(templateId: string, stepSetId: string, stepId: string): string {
    return this.getTemplateStepUrl(templateId, stepSetId, stepId) + '/name';
  }

  public getMepsUrl(): string {
    return `${environment.apiUrl}${environment.paths.meps}`;
  }

  public getMepUrl(mepId: string): string {
    return this.getMepsUrl() + '/' + mepId;
  }

  public getMepFieldUrl(mepId: string, fieldName: string): string {
    return this.getMepUrl(mepId) + '/' + fieldName;
  }

  public getMepCloseUrl(mepId: string): string {
    return this.getMepUrl(mepId) + '/close';
  }

  public getMepOpenUrl(mepId: string): string {
    return this.getMepUrl(mepId) + '/open';
  }

  public getApisUrl(mepId: string): string {
    return this.getMepUrl(mepId) + environment.paths.apis;
  }

  public getApiUrl(mepId: string, apiId: string): string {
    return this.getApisUrl(mepId) + '/' + apiId;
  }

  public getApiFieldUrl(mepId: string, apiId: string, fieldName: string): string {
    return this.getApiUrl(mepId, apiId) + '/' + fieldName;
  }

  public getStepsetsUrl(mepId: string, apiId: string): string {
    return this.getApiUrl(mepId, apiId) + environment.paths.stepsets;
  }

  public getStepsetUrl(mepId: string, apiId: string, stepsetId: string): string {
    return this.getStepsetsUrl(mepId, apiId) + '/' + stepsetId;
  }

  public getStepsUrl(mepId: string, apiId: string, stepsetid: string): string {
    return this.getStepsetUrl(mepId, apiId, stepsetid) + environment.paths.steps;
  }

  public getStepUrl(mepId: string, apiId: string, stepsetId: string, stepId: string): string {
    return this.getStepsUrl(mepId, apiId, stepsetId) + '/' + stepId;
  }

  public getDistinctStatusesUrl() {
    return `${environment.apiUrl}/statuses`;
  }

  public getDistinctProjectNamesUrl() {
    return `${environment.apiUrl}/distinct/projects`;
  }

  public getDistinctApiNamesUrl() {
    return `${environment.apiUrl}/distinct/apis`;
  }


}
