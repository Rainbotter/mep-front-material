import { Injectable } from '@angular/core';
import { Api } from '../interfaces/responses/mep/api';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }

  public getTypes(): string[] {
    return ['DOCKER', 'RANCHER'];
  }

  public createApi(mepId: string, name: string, type: string): Promise<Api> {
    const requestObject = {name, type};
    return this.http.post<Api>(this.urlService.getApisUrl(mepId), requestObject).toPromise();
  }

  public updateMepField(mepId: string, fieldName: string, newValue: string): Promise<any> {
    const requestObject = {newValue};
    return this.http.put<Api>(this.urlService.getMepFieldUrl(mepId, fieldName), requestObject).toPromise();
  }

  public updateApiField(mepId: string, apiId: string, fieldName: string, newValue: string): Promise<any> {
    const requestObject = {newValue};
    return this.http.put<Api>(this.urlService.getApiFieldUrl(mepId, apiId, fieldName), requestObject).toPromise();
  }

  public updateStepStatus(mepId: string, apiId: string, stepsetId: string, stepId: string, newStatus: string): Promise<any> {
    const requestObject = {newStatus};
    return this.http.put<Api>(this.urlService.getStepUrl(mepId, apiId, stepsetId, stepId), requestObject).toPromise();
  }

}
