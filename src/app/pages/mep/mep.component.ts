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
  public displayedColumns: string[] = [
    'name', 'maintainer', 'change',
    'comment', 'dbUpdate', 'dockerImage',
    'exposition', 'newVersion', 'oldVersion',
    'type', 'steps'];

  private focusInValue: string;
  private focusInDateValue: Date;

  constructor(private route: ActivatedRoute,
              private mepService: MepService,
              private apiService: ApiService,
              private router: Router,
              private app: ApplicationService) {
    this.mep = {};
    this.subscriptions = [];
    this.app.startLoading();
    this.statuses = [Status.OK, Status.PENDING, Status.NOK, Status.NA];
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

  }

  public reOpenMep(mep: Mep): void {

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

}
