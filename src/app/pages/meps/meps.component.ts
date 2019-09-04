import { Component, OnDestroy, OnInit } from '@angular/core';
import { MepService } from '../../services/mep.service';
import { Mep } from '../../interfaces/responses/mep/mep';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog, PageEvent } from '@angular/material';
import { MepCreationModalComponent } from '../../components/mep-creation-modal/mep-creation-modal.component';
import { Template } from '../../interfaces/responses/template/template';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'mep-meps',
  templateUrl: './meps.component.html',
  styleUrls: ['./meps.component.css']
})
export class MepsComponent implements OnInit, OnDestroy {

  private allMeps: Mep[];

  public meps: Mep[];
  public templates: Template[];
  public projects: string[];
  public statuses: string[];

  public displayedColumns: string[] = ['name', 'status', 'project', 'creationDate', 'lastModificationDate', 'closureDate', 'action'];

  public length = 100;
  public pageSize = 10;

  public projectControl = new FormControl();
  public statusControl = new FormControl();

  private subscriptions: Subscription[] = [];

  constructor(private mepService: MepService,
              private templateService: TemplateService,
              public dialog: MatDialog) {
    this.updateMeps();

    this.templateService.getTemplates()
      .then(res => this.templates = res)
      .catch(err => console.log(err));

    this.subscriptions.push(this.projectControl.valueChanges.subscribe(value => {
      this.updateMepsToDisplay();
    }));

    this.subscriptions.push(this.statusControl.valueChanges.subscribe(value => {
      this.updateMepsToDisplay();
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public computeStatus(mep: Mep): string {
    if (mep.closureDate) {
      return 'Fermée';
    } else {
      return 'En cours';
    }
  }

  private updateMepsToDisplay(): void {
    this.meps = this.allMeps.filter(mep => {
        if (this.projectControl.value && this.projectControl.value.length > 0 && !this.projectControl.value.includes(mep.project)) {
          return false;
        }

        if (this.statusControl.value && this.statusControl.value.length > 0 && !this.statusControl.value.includes(this.computeStatus(mep))) {
          return false;
        }

        return true;
      }
    );

    this.length = this.meps.length;
  }

  public changePage(pageEvent: PageEvent): void {
    this.updateMepsToDisplay();
    this.meps = this.meps.slice(pageEvent.pageIndex * pageEvent.pageSize, (pageEvent.pageIndex * pageEvent.pageSize) + pageEvent.pageSize);
  }

  public createMep(): void {
    const dialogRef = this.dialog.open(MepCreationModalComponent, {
      data: {meps: this.meps, templates: this.templates},
      autoFocus: false
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(res => {
        this.updateMeps();
      })
    );
  }

  private updateMeps(): void {
    this.mepService.getMeps()
      .then(res => {
        this.allMeps = res;
        this.meps = this.allMeps.slice(0, this.pageSize);
        this.length = this.allMeps.length;

        this.projects = Array.from(new Set(this.allMeps.map(mep => mep.project)));
        this.statuses = ['En cours', 'Fermée'];
        this.updateMepsToDisplay();
      })
      .catch(err => console.log(err));
  }

}
