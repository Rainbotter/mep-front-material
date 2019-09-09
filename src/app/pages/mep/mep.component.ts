import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mep } from '../../interfaces/responses/mep/mep';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MepService } from '../../services/mep.service';
import { ApplicationService } from '../../services/application.service';
import { Api } from '../../interfaces/responses/mep/api';
import { Status } from '../../interfaces/enums/status';
import { Step } from '../../interfaces/responses/mep/step';
import { ApiService } from '../../services/api.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { StepSet } from '../../interfaces/responses/mep/step-set';
import { ApiCreationModalComponent } from '../../components/modals/api-creation-modal/api-creation-modal.component';
import { MatDialog } from '@angular/material';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'mep-mep',
  templateUrl: './mep.component.html',
  styleUrls: ['./mep.component.css']
})
export class MepComponent implements OnInit, OnDestroy {

  public faSpinner = faSpinner;
  public mep: Mep;
  public statuses: string[];
  private subscriptions: Subscription[];
  public apiTypes = ['DOCKER', 'RANCHER'];

  private focusInValue: string;

  constructor(private route: ActivatedRoute,
              private mepService: MepService,
              private apiService: ApiService,
              private router: Router,
              private app: ApplicationService,
              public dialog: MatDialog) {
    this.mep = {};
    this.subscriptions = [];
    this.app.startLoading();
    this.statuses = [Status.OK, Status.PENDING, Status.NOK, Status.NA];
    this.updateMep();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => {
      el.unsubscribe();
    });
  }

  public isCreated(api: Api): boolean {
    return this.flatmapSteps(api)
      .filter(step => step.status !== Status.NOK)
      .length === 0;
  }

  public isStarted(api: Api): boolean {
    let array = this.flatmapSteps(api);
    return array.filter(step => step.status !== Status.NOK).length !== 0 &&
      array.filter(step => step.status === Status.OK).length < array.length;
  }

  public isCompleted(api: Api): boolean {
    return this.flatmapSteps(api)
      .filter(step => step.status !== Status.OK)
      .length === 0;
  }

  public setStepStatus(mep: Mep, api: Api, stepset: StepSet, step: Step, status: string) {
    this.apiService.updateStepStatus(mep.id, api.id, stepset.id, step.id, status)
      .then(res => step.status = status)
      .catch(err => console.log(err));
  }

  public updateMepValue(mep: Mep, fieldName: string) {
    console.log(mep[fieldName]);
    if (mep[fieldName] !== this.focusInValue) {
      this.apiService.updateMepField(mep.id, fieldName, mep[fieldName]);
    }
  }

  public closeMep(mep: Mep): void {
    this.mepService.closeMep(mep.id)
      .then(res => {
        this.mep = res;
      })
      .catch(err => {

      });
  }

  public reOpenMep(mep: Mep): void {
    this.mepService.openMep(mep.id)
      .then(res => {
        this.mep = res;
      })
      .catch(err => {

      });
  }

  public updateApiValue(mep: Mep, api: Api, fieldName: string) {
    if (api[fieldName] !== this.focusInValue) {
      this.apiService.updateApiField(mep.id, api.id, fieldName, api[fieldName]);
    }
  }

  public saveFocusinValue(value: string) {
    this.focusInValue = value;
  }

  private flatmapSteps(api: Api): Step[] {
    const result: Step[] = [];
    api.stepsets
      .map(stepSet => stepSet.steps)
      .map(steps => steps.forEach(step => result.push(step)));

    return result;
  }

  public addApi(): void {

    const dialogRef = this.dialog.open(ApiCreationModalComponent, {
      data: {mep: this.mep},
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.updateMep();
      })
    );
  }

  public updateMep(): void {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.mepService.getMep(params['id']).then(value => {
          this.app.stopLoading();
          this.mep = value;
        }).catch(err => {
          this.app.stopLoading();
          this.router.navigate(['/']);
        });
      }
    }));
  }

  public removeApi(apiToRemove: Api): void {

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      autoFocus: false
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mepService.removeApi(this.mep.id, apiToRemove.id)
          .then(res => {
            this.mep = res;
          })
          .catch(err => {

          });
      }
    }));

  }

}
