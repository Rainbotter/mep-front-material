import { Injectable } from '@angular/core';
import { Api } from '../interfaces/responses/mep/api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getTypes(): string[] {
    return ['DOCKER', 'RANCHER'];
  }

  public createApi(mepId: string, name: string, maintainer: string, type: string, oldVersion: string, newVersion: string): Promise<Api> {
    const requestObject = {name, maintainer, type, oldVersion, newVersion};
    return this.http.post<Api>(`${environment.apiUrl}${environment.paths.meps}/${mepId}${environment.paths.apis}`, requestObject).toPromise();
  }

}
