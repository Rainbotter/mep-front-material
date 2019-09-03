import { Injectable } from '@angular/core';
import { Mep } from '../interfaces/responses/mep/mep';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class MepService {

  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }

  public getMeps(): Promise<Mep[]> {
    return this.http.get<Mep[]>(this.urlService.getMepsUrl())
      .pipe(map(value => {
        value.forEach(mep => {
          this.mapDatesToMep(mep);
        });
        return value;
      }))
      .toPromise();
  }

  public getMep(mepId: string): Promise<Mep> {
    return this.http.get<Mep>(this.urlService.getMepUrl(mepId))
      .pipe(map(mep => {
        this.mapDatesToMep(mep);
        mep.apis.forEach(api => {
          api.stepsets.sort((a, b) => {
            return a.order - b.order;
          });
          api.stepsets.forEach(stepset => {
            stepset.steps.sort((a, b) => {
              return a.order - b.order;
            });
          });
        });
        return mep;
      }))
      .toPromise();
  }

  public createMep(name: string, project: string, templateId: string): Promise<Mep> {
    const requestObject = {name, project, templateId};

    return this.http.post<Mep>(this.urlService.getMepsUrl(), requestObject)
      .pipe(map(mep => {
        this.mapDatesToMep(mep);
        return mep;
      }))
      .toPromise();
  }

  public openMep(mepId: string): Promise<any> {
    return this.http.put<Mep[]>(this.urlService.getMepOpenUrl(mepId), {}).toPromise();
  }

  public closeMep(mepId: string): Promise<any> {
    return this.http.put<Mep[]>(this.urlService.getMepCloseUrl(mepId), {}).toPromise();
  }

  private mapDatesToMep(mep: Mep): void {
    mep.closureDate = mep.closureDate ? new Date(mep.closureDate) : null;
    mep.lastModificationDate = mep.lastModificationDate ? new Date(mep.lastModificationDate) : null;
    mep.creationDate = mep.creationDate ? new Date(mep.creationDate) : null;
  }

}
