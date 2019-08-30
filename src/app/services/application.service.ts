import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public isLoadingState;

  constructor() {
    this.isLoadingState = false;
  }

  public startLoading(): void {
    this.isLoadingState = true;
  }

  public stopLoading(): void {
    this.isLoadingState = false;
  }

  public isLoading(): boolean {
    return this.isLoadingState;
  }

}
