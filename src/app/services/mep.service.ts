import { Injectable } from '@angular/core';
import { Mep } from '../interfaces/responses/mep/mep';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MepService {

  constructor(private http: HttpClient) {
  }

  public getMeps(): Promise<Mep[]> {
    return this.http.get<Mep[]>(`${environment.apiUrl}${environment.paths.meps}`)
      .pipe(map(value => {
        value.forEach(mep => {
          mep.closureDate = mep.closureDate ? new Date(mep.closureDate) : null;
          mep.lastModificationDate = mep.lastModificationDate ? new Date(mep.lastModificationDate) : null;
          mep.creationDate = mep.creationDate ? new Date(mep.creationDate) : null;
        });
        return value;
      }))
      .toPromise();
  }

  public createMep(name: string, project: string, version: string, templateId: string): Promise<Mep> {
    const requestObject = {name, project, version, templateId};

    return this.http.post<Mep>(`${environment.apiUrl}${environment.paths.meps}`, requestObject)
      .pipe(map(mep => {
        mep.closureDate = mep.closureDate ? new Date(mep.closureDate) : null;
        mep.lastModificationDate = mep.lastModificationDate ? new Date(mep.lastModificationDate) : null;
        mep.creationDate = mep.creationDate ? new Date(mep.creationDate) : null;
        return mep;
      }))
      .toPromise();
  }

}
