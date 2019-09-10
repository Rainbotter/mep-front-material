import { Injectable } from '@angular/core';
import { Mep } from '../interfaces/responses/mep/mep';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UrlService } from './url.service';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class MepService {

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private app: ApplicationService) {
  }

  public getMeps(): Promise<Mep[]> {
    this.app.startBackgroundLoading();
    return this.http.get<Mep[]>(this.urlService.getMepsUrl())
      .pipe(map(value => {
        value.forEach(mep => {
          this.mapDatesToMep(mep);
        });
        return value;
      }))
      .toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public getMep(mepId: string): Promise<Mep> {
    this.app.startBackgroundLoading();
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
      .toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public createMep(name: string, project: string, templateId: string): Promise<Mep> {
    this.app.startBackgroundLoading();
    const requestObject = {name, project, templateId};

    return this.http.post<Mep>(this.urlService.getMepsUrl(), requestObject)
      .pipe(map(mep => {
        this.mapDatesToMep(mep);
        return mep;
      }))
      .toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public removeApi(mepId: string, apiId: string): Promise<Mep> {
    this.app.startBackgroundLoading();
    return this.http.delete<Mep>(this.urlService.getApiUrl(mepId, apiId), {}).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public openMep(mepId: string): Promise<any> {
    this.app.startBackgroundLoading();
    return this.http.put<Mep[]>(this.urlService.getMepOpenUrl(mepId), {}).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  public closeMep(mepId: string): Promise<any> {
    this.app.startBackgroundLoading();
    return this.http.put<Mep[]>(this.urlService.getMepCloseUrl(mepId), {}).toPromise()
      .then(res => {
        this.app.stopBackgroundLoading();
        return res;
      }).catch(err => {
        this.app.stopBackgroundLoading();
        return err;
      });
  }

  private mapDatesToMep(mep: Mep): void {
    mep.closureDate = mep.closureDate ? new Date(mep.closureDate) : null;
    mep.lastModificationDate = mep.lastModificationDate ? new Date(mep.lastModificationDate) : null;
    mep.creationDate = mep.creationDate ? new Date(mep.creationDate) : null;
  }

}
