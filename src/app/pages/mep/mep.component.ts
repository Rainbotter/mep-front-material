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
import { SnackService } from '../../services/snack.service';

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
  public jiraEdition: boolean;

  private focusInValue: string;

  constructor(private route: ActivatedRoute,
              private mepService: MepService,
              private apiService: ApiService,
              private router: Router,
              private app: ApplicationService,
              private snackService: SnackService,
              public dialog: MatDialog) {
    this.mep = {};
    this.subscriptions = [];
    this.statuses = Status.getAllStatus();
    this.updateMep();
    this.jiraEdition = false;
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

  public isClosed(): boolean {
    return !!this.mep.closureDate;
  }

  public setStepStatus(mep: Mep, api: Api, stepset: StepSet, step: Step, status: string) {
    this.apiService.updateStepStatus(mep.id, api.id, stepset.id, step.id, status)
      .then(res => {
        step.status = status;
        this.snackService.openActionSucceedSnack();
      })
      .catch(err => this.snackService.openErrorSnack('Une erreur est survenue lors de la mise à jours du status de ' + step.name));
  }

  public updateMepValue(mep: Mep, fieldName: string) {
    if (mep[fieldName] !== this.focusInValue) {
      this.apiService.updateMepField(mep.id, fieldName, mep[fieldName])
        .then(res => this.snackService.openActionSucceedSnack())
        .catch(err => {
          this.snackService.openErrorSnack('Une erreur est survenue lors de la mise à jour du champs ' + fieldName);
          mep[fieldName] = this.focusInValue;
        });
    }
  }

  public closeMep(mep: Mep): void {
    this.app.startLoading();
    this.mepService.closeMep(mep.id)
      .then(res => {
        this.snackService.openActionSucceedSnack();
        this.app.stopLoading();
        this.mep = res;
      })
      .catch(err => {
        this.snackService.openErrorSnack('Une erreur est survenue lors de la clotûre de la mep');
        this.app.stopLoading();
      });
  }

  public reOpenMep(mep: Mep): void {
    this.app.startLoading();
    this.mepService.openMep(mep.id)
      .then(res => {
        this.snackService.openActionSucceedSnack();
        this.app.stopLoading();
        this.mep = res;
      })
      .catch(err => {
        this.snackService.openErrorSnack('Une erreur est survenue lors de la re-ouverture de la mep');
        this.app.stopLoading();
      });
  }

  public updateApiValue(mep: Mep, api: Api, fieldName: string) {
    if (api[fieldName] !== this.focusInValue) {
      this.apiService.updateApiField(mep.id, api.id, fieldName, api[fieldName])
        .then(res => this.snackService.openActionSucceedSnack())
        .catch(err => this.snackService.openErrorSnack('Une erreur est survenue lors de la mise à jour du champs ' + fieldName));
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

    if (this.isClosed()) {
      return;
    }

    this.app.startLoading();
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.mepService.getMep(params['id']).then(value => {
          this.app.stopLoading();
          this.mep = value;
        }).catch(err => {
          this.snackService.openErrorSnack('Une erreur est survenue lors du chargement de la MEP');
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
        this.app.startLoading();
        this.mepService.removeApi(this.mep.id, apiToRemove.id)
          .then(res => {
            this.snackService.openActionSucceedSnack();
            this.mep = res;
            this.app.stopLoading();
          })
          .catch(err => {
            this.snackService.openErrorSnack('Une erreur est survenue lors de la suppression de l\'API ' + apiToRemove.name);
          });
      }
    }));

  }

  public editJira(): void {
    this.jiraEdition = true;
  }

  public cancelJira(): void {
    this.mep.jira = this.focusInValue;
    this.jiraEdition = false;
  }

  public validateJira(): void {
    this.updateMepValue(this.mep, 'jira');
    this.jiraEdition = false;
  }

  public navigateToLink(link: string): void {
    if (!this.jiraEdition && link) {
      window.open(link, '_blank');
    }
  }

}
