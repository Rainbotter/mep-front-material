import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mep } from '../../interfaces/responses/mep/mep';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MepService } from '../../services/mep.service';
import { ApplicationService } from '../../services/application.service';
import { Api } from '../../interfaces/responses/mep/api';
import { Status } from '../../interfaces/enums/status';
import { Step } from '../../interfaces/responses/mep/step';

@Component({
  selector: 'mep-mep',
  templateUrl: './mep.component.html',
  styleUrls: ['./mep.component.css']
})
export class MepComponent implements OnInit, OnDestroy {

  public mep: Mep;
  public statuses: string[];
  private subscriptions: Subscription[];
  public displayedColumns: string[] = [
    'name', 'maintainer', 'change',
    'comment', 'dbUpdate', 'dockerImage',
    'exposition', 'newVersion', 'oldVersion',
    'type', 'steps'];

  constructor(private route: ActivatedRoute,
              private mepService: MepService,
              private router: Router,
              private app: ApplicationService) {
    this.subscriptions = [];
    this.app.startLoading();
    this.statuses = [Status.OK, Status.PENDING, Status.NOK, Status.NA];
  }

  ngOnInit() {
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

  public setStepStatus(step: Step, status: string) {
    step.status = status;
  }

  private flatmapSteps(api: Api): Step[] {
    const result: Step[] = [];
    api.stepsets
      .map(stepSet => stepSet.steps)
      .map(steps => steps.forEach(step => result.push(step)));

    return result;
  }

}
