import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mep } from '../../interfaces/responses/mep/mep';
import { Template } from '../../interfaces/responses/template/template';
import { MepService } from '../../services/mep.service';
import { MatDialog } from '@angular/material';
import { TemplateService } from '../../services/template.service';
import { TemplateCreationModalComponent } from '../../components/modals/template-creation-modal/template-creation-modal.component';
import { Subscription } from 'rxjs';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'mep-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['name', 'uses', 'action'];

  public meps: Mep[];
  public templates: Template[];

  private subscriptions: Subscription[] = [];

  constructor(private appService: ApplicationService,
              private mepService: MepService,
              private templateService: TemplateService,
              public dialog: MatDialog) {

    this.appService.startLoading();

    this.mepService.getMeps()
      .then(res => {
        this.meps = res;
        this.appService.stopLoading();
      })
      .catch(err => console.log(err));

    this.templateService.getTemplates()
      .then(res => this.templates = res)
      .catch(err => console.log(err));

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  public numberOfUse(template: Template): number {
    return this.meps.filter(mep => mep.templateId === template.id).length;
  }

  public createTemplate(): void {

    const dialogRef = this.dialog.open(TemplateCreationModalComponent, {
      data: {meps: this.meps, templates: this.templates},
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.templateService.getTemplates()
          .then(res => this.templates = res)
          .catch(err => console.log(err));
      })
    );
  }

}
