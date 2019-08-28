import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Template } from '../interfaces/responses/template/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) {
  }

  public getTemplates(): Promise<Template[]> {
    return this.http.get<Template[]>(`${environment.apiUrl}${environment.paths.templates}`).toPromise();
  }

}
