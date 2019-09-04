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

}
