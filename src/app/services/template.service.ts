import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Template } from '../interfaces/responses/template/template';
import { UrlService } from './url.service';

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
    const requestObject = {name};
    return this.http.post<Template>(this.urlService.getTemplatesUrl(), requestObject).toPromise();
  }

  public getTemplate(templateId: string): Promise<Template> {
    return this.http.get<Template>(this.urlService.getTemplateUrl(templateId)).toPromise();
  }

  public createStepSet(templateId: string, stepSetName: string): Promise<Template> {
    const requestObject = {name};
    return this.http.post<Template>(this.urlService.getTemplateUrl(templateId), requestObject).toPromise();
  }

  public createStep(templateId: string, StepSetId: string, stepName: string): Promise<Template> {
    const requestObject = {name};
    return this.http.post<Template>(this.urlService.getTemplateStepSetUrl(templateId, StepSetId), requestObject).toPromise();
  }

  public deleteStepSet(templateId: string): Promise<Template> {
    const requestObject = {};
    return this.http.delete<Template>(this.urlService.getTemplateUrl(templateId), requestObject).toPromise();
  }

  public deleteStep(templateId: string, StepSetId: string): Promise<Template> {
    const requestObject = {};
    return this.http.delete<Template>(this.urlService.getTemplateStepSetUrl(templateId, StepSetId), requestObject).toPromise();
  }

}
