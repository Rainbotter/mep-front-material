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
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private app: ApplicationService) {
  }

  public getTemplates(): Promise<Template[]> {
    this.app.startBackgroundLoading();
    return this.http.get<Template[]>(this.urlService.getTemplatesUrl()).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public createTemplate(templateName: string): Promise<Template> {
    this.app.startBackgroundLoading();
    const requestObject: CreateTemplateRequest = {name: templateName};
    return this.http.post<Template>(this.urlService.getTemplatesUrl(), requestObject).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public getTemplate(templateId: string): Promise<Template> {
    this.app.startBackgroundLoading();
    return this.http.get<Template>(this.urlService.getTemplateUrl(templateId)).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public createStepSet(templateId: string, stepSetName: string, order: number): Promise<Template> {
    this.app.startBackgroundLoading();
    const requestObject: CreateStepSetRequest = {name: stepSetName, order};
    return this.http.post<Template>(this.urlService.getTemplateStepSetsUrl(templateId), requestObject).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public renameStepSet(templateId: string, stepSetId: string, newName: string): Promise<Template> {
    this.app.startBackgroundLoading();
    const requestObject: RenameStepSetRequest = {newName};
    return this.http.put<Template>(this.urlService.getTemplateStepSetRenameUrl(templateId, stepSetId), requestObject).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public createStep(templateId: string, stepSetId: string, stepName: string, order: number): Promise<Template> {
    this.app.startBackgroundLoading();
    const requestObject: CreateStepRequest = {name: stepName, order, status: Status.NOK};
    return this.http.post<Template>(this.urlService.getTemplateStepsUrl(templateId, stepSetId), requestObject).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public deleteStepSet(templateId: string, stepSetId: string): Promise<Template> {
    this.app.startBackgroundLoading();
    const requestObject = {};
    return this.http.delete<Template>(this.urlService.getTemplateStepSetUrl(templateId, stepSetId), requestObject).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public renameStep(templateId: string, stepSetId: string, stepId: string, newName: string): Promise<Template> {
    this.app.startBackgroundLoading();
    const requestObject: RenameStepRequest = {newName};
    return this.http.put<Template>(this.urlService.getTemplateStepRenameUrl(templateId, stepSetId, stepId), requestObject).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public deleteStep(templateId: string, stepSetId: string, stepId: string): Promise<Template> {
    this.app.startBackgroundLoading();
    const requestObject = {};
    return this.http.delete<Template>(this.urlService.getTemplateStepUrl(templateId, stepSetId, stepId), requestObject).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

}
