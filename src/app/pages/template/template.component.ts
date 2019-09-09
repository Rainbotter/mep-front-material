import { Component, OnDestroy, OnInit } from '@angular/core';
import { Template } from '../../interfaces/responses/template/template';
import { TemplateService } from '../../services/template.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../interfaces/enums/status';
import { MatDialog } from '@angular/material';
import { StepsetCreationModalComponent } from '../../components/modals/stepset-creation-modal/stepset-creation-modal.component';
import { StepCreationModalComponent } from '../../components/modals/step-creation-modal/step-creation-modal.component';

@Component({
  selector: 'mep-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, OnDestroy {

  public template: Template;

  private subscriptions: Subscription[];

  public statuses: string[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private templateService: TemplateService,
              public dialog: MatDialog) {
    this.subscriptions = [];
    this.statuses = [Status.OK, Status.PENDING, Status.NOK, Status.NA];
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      this.templateService.getTemplate(params['id'])
        .then(res => this.template = res)
        .catch(err => console.log(err));
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => {
      el.unsubscribe();
    });
  }

  public addStepset(): void {
    const dialogRef = this.dialog.open(StepsetCreationModalComponent, {
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
      })
    );
  }

  public addStep(setStepId: string): void {

    const dialogRef = this.dialog.open(StepCreationModalComponent, {
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
      })
    );
  }

}
