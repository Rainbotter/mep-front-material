import { Component, OnDestroy, OnInit } from '@angular/core';
import { Template } from '../../interfaces/responses/template/template';
import { TemplateService } from '../../services/template.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../interfaces/enums/status';
import { MatDialog } from '@angular/material';
import { StepsetCreationModalComponent } from '../../components/modals/stepset-creation-modal/stepset-creation-modal.component';
import { StepCreationModalComponent } from '../../components/modals/step-creation-modal/step-creation-modal.component';
import { StepSetTemplate } from '../../interfaces/responses/template/step-set-template';
import { StepTemplate } from '../../interfaces/responses/template/step-template';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';
import { RenameStepsetModalComponent } from '../../components/modals/rename-stepset-modal/rename-stepset-modal.component';
import { RenameStepModalComponent } from '../../components/modals/rename-step-modal/rename-step-modal.component';
import { SnackService } from '../../services/snack.service';

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
              private snackService: SnackService,
              public dialog: MatDialog) {
    this.subscriptions = [];
    this.statuses = Status.getAllStatus();

    this.updateTemplate();
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
      data: {template: this.template},
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.updateTemplate();
      })
    );
  }

  public addStep(stepSet: StepSetTemplate): void {

    const dialogRef = this.dialog.open(StepCreationModalComponent, {
      data: {template: this.template, stepSet},
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.updateTemplate();
      })
    );
  }

  public deleteStepSet(stepSet: StepSetTemplate): void {

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      autoFocus: false
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.templateService.deleteStepSet(this.template.id, stepSet.id)
          .then(res => {
            this.template = res;
            this.snackService.openActionSucceedSnack();
          })
          .catch(err => this.snackService.openErrorSnack('Une erreur est survenue lors la suppression du step: ' + err));
      }
    }));
  }

  public deleteStep(stepSet: StepSetTemplate, step: StepTemplate): void {

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      autoFocus: false
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.templateService.deleteStep(this.template.id, stepSet.id, step.id)
          .then(res => {
            this.template = res;
            this.snackService.openActionSucceedSnack();
          })
          .catch(err => {
            this.snackService.openErrorSnack('Une erreur est survenue lors la supression du step: ' + err);
          });
      }
    }));
  }

  public renameStepSet(stepSet: StepSetTemplate): void {

    const dialogRef = this.dialog.open(RenameStepsetModalComponent, {
      data: {template: this.template, stepSet},
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.updateTemplate();
      })
    );
  }

  public renameStep(stepSet: StepSetTemplate, step: StepTemplate): void {

    const dialogRef = this.dialog.open(RenameStepModalComponent, {
      data: {template: this.template, stepSet, step},
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.updateTemplate();
      })
    );
  }

  private updateTemplate(): void {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      this.templateService.getTemplate(params['id'])
        .then(res => {
          this.template = res;
        })
        .catch(err => this.snackService.openErrorSnack('Une erreur est survenue lors de la mise à jour du template : ' + err));
    }));
  }

}
