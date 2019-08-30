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
          this.mapDatesToMep(mep);
        });
        return value;
      }))
      .toPromise();
  }

  public getMep(mepId: string): Promise<Mep> {
    return this.http.get<Mep>(`${environment.apiUrl}${environment.paths.meps}/${mepId}`)
      .pipe(map(mep => {
        this.mapDatesToMep(mep);
        mep.apis.forEach(api => {
          api.stepsets.sort((a, b) => {return a.order - b.order;});
          api.stepsets.forEach(stepset => {
            stepset.steps.sort((a, b) => {return a.order - b.order;});
          })
        });
        return mep;
      }))
      .toPromise();
  }

  public createMep(name: string, project: string, version: string, templateId: string): Promise<Mep> {
    const requestObject = {name, project, version, templateId};

    return this.http.post<Mep>(`${environment.apiUrl}${environment.paths.meps}`, requestObject)
      .pipe(map(mep => {
        this.mapDatesToMep(mep);
        return mep;
      }))
      .toPromise();
  }

  private mapDatesToMep(mep: Mep): void {
    mep.closureDate = mep.closureDate ? new Date(mep.closureDate) : null;
    mep.lastModificationDate = mep.lastModificationDate ? new Date(mep.lastModificationDate) : null;
    mep.creationDate = mep.creationDate ? new Date(mep.creationDate) : null;
  }

}
