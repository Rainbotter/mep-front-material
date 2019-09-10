import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  public statuses: string[];
  public projectNames: string[];
  public apiNames: string[];

  private pollingTime = 60000;

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private appService: ApplicationService) {
    this.appService.startBackgroundLoading();
    this.callStatuses()
      .then(res => {
        this.statuses = res;
        this.appService.stopBackgroundLoading();
      })
      .catch(err => this.appService.stopBackgroundLoading());

    this.pollProjectNames();
    this.pollApiNames();
  }

  private pollProjectNames(): void {
    this.appService.startBackgroundLoading();
    this.callProjectNames().then(result => {
      this.projectNames = result;
      this.appService.stopBackgroundLoading();
    }).catch(err => this.appService.stopBackgroundLoading());

    setTimeout(() => this.pollApiNames(), this.pollingTime);
  }

  private pollApiNames(): void {
    this.appService.startBackgroundLoading();
    this.callApiNames().then(result => {
      this.apiNames = result;
      this.appService.stopBackgroundLoading();
    }).catch(err => this.appService.stopBackgroundLoading());

    setTimeout(() => this.pollApiNames(), this.pollingTime);
  }

  private callStatuses(): Promise<string[]> {
    return this.http.get<string[]>(this.urlService.getDistinctStatusesUrl()).toPromise();
  }

  private callProjectNames(): Promise<string[]> {
    return this.http.get<string[]>(this.urlService.getDistinctProjectNamesUrl()).toPromise();
  }

  private callApiNames(): Promise<string[]> {
    return this.http.get<string[]>(this.urlService.getDistinctApiNamesUrl()).toPromise();
  }

}
