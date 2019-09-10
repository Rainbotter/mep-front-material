import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private isLoadingState: number;
  private isBackgroundLoadingState: number;

  constructor() {
    this.isLoadingState = 0;
    this.isBackgroundLoadingState = 0;
  }

  public startLoading(): void {
    this.isLoadingState++;
  }

  public stopLoading(): void {
    this.isLoadingState--;
    if (this.isLoadingState < 0) {
      this.isLoadingState = 0;
    }
  }

  public isLoading(): boolean {
    return this.isLoadingState !== 0;
  }

  public startBackgroundLoading(): void {
    this.isBackgroundLoadingState++;
  }

  public stopBackgroundLoading(): void {
    this.isBackgroundLoadingState--;
    if (this.isBackgroundLoadingState < 0) {
      this.isBackgroundLoadingState = 0;
    }
  }

  public isBackgroundLoading(): boolean {
    return this.isBackgroundLoadingState !== 0;
  }

}
