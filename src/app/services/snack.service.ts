import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InfoSnackbarComponent } from '../components/snackbars/info-snackbar/info-snackbar.component';
import { ErrorSnackbarComponent } from '../components/snackbars/error-snackbar/error-snackbar.component';
import { ActionSucceedSnackbarComponent } from '../components/snackbars/action-succeed-snackbar/action-succeed-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  private durationInSeconds = 5;
  private shortDurationInSeconds = 1;

  constructor(private snackBar: MatSnackBar) {
  }

  public openInfoSnack(message: string): void {
    this.snackBar.openFromComponent(InfoSnackbarComponent, {
      data: message,
      duration: this.durationInSeconds * 1000,
    });
  }

  public openErrorSnack(message: string): void {
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: message,
      duration: this.durationInSeconds * 1000,
    });
  }

  public openActionSucceedSnack(): void {
    this.snackBar.openFromComponent(ActionSucceedSnackbarComponent, {
      duration: this.shortDurationInSeconds * 1000,
    });
  }

}
