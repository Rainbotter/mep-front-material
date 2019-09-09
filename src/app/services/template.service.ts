import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Template } from '../interfaces/responses/template/template';
import { UrlService } from './url.service';
import { CreateTemplateRequest } from '../interfaces/requests/template/CreateTemplateRequest';
import { CreateStepSetRequest } from '../interfaces/requests/template/CreateStepSetRequest';
import { CreateStepRequest } from '../interfaces/requests/template/CreateStepRequest';
import { Status } from '../interfaces/enums/status';
import { RenameStepSetRequest } from '../interfaces/requests/template/RenameStepSetRequest';
import { RenameStepRequest } from '../interfaces/requests/template/RenameStepRequest';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }

  public getTemplates(): Promise<Template[]> {
    return this.http.get<Template[]>(this.urlService.getTemplatesUrl()).toPromise();
  }

  public createTemplate(templateName: string): Promise<Template> {
    const requestObject: CreateTemplateRequest = {name};
    return this.http.post<Template>(this.urlService.getTemplatesUrl(), requestObject).toPromise();
  }

  public getTemplate(templateId: string): Promise<Template> {
    return this.http.get<Template>(this.urlService.getTemplateUrl(templateId)).toPromise();
  }

  public createStepSet(templateId: string, stepSetName: string, order: number): Promise<Template> {
    const requestObject: CreateStepSetRequest = {name: stepSetName, order};
    return this.http.post<Template>(this.urlService.getTemplateStepSetsUrl(templateId), requestObject).toPromise();
  }

  public renameStepSet(templateId: string, stepSetId: string, newName: string): Promise<Template> {
    const requestObject: RenameStepSetRequest = {newName};
    return this.http.put<Template>(this.urlService.getTemplateStepSetRenameUrl(templateId, stepSetId), requestObject).toPromise();
  }

  public createStep(templateId: string, stepSetId: string, stepName: string, order: number): Promise<Template> {
    const requestObject: CreateStepRequest = {name: stepName, order, status: Status.NOK};
    return this.http.post<Template>(this.urlService.getTemplateStepsUrl(templateId, stepSetId), requestObject).toPromise();
  }

  public deleteStepSet(templateId: string, stepSetId: string): Promise<Template> {
    const requestObject = {};
    return this.http.delete<Template>(this.urlService.getTemplateStepSetUrl(templateId, stepSetId), requestObject).toPromise();
  }

  public renameStep(templateId: string, stepSetId: string, stepId: string, newName: string): Promise<Template> {
    const requestObject: RenameStepRequest = {newName};
    return this.http.put<Template>(this.urlService.getTemplateStepRenameUrl(templateId, stepSetId, stepId), requestObject).toPromise();
  }

  public deleteStep(templateId: string, stepSetId: string, stepId: string): Promise<Template> {
    const requestObject = {};
    return this.http.delete<Template>(this.urlService.getTemplateStepUrl(templateId, stepSetId, stepId), requestObject).toPromise();
  }

}
