import { Component, OnDestroy, OnInit } from '@angular/core';
import { MepService } from '../../services/mep.service';
import { Mep } from '../../interfaces/responses/mep/mep';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog, PageEvent, Sort, SortDirection } from '@angular/material';
import { MepCreationModalComponent } from '../../components/modals/mep-creation-modal/mep-creation-modal.component';
import { Template } from '../../interfaces/responses/template/template';
import { TemplateService } from '../../services/template.service';
import { ApplicationService } from '../../services/application.service';
import { MiscService } from '../../services/misc.service';

@Component({
  selector: 'mep-meps',
  templateUrl: './meps.component.html',
  styleUrls: ['./meps.component.css']
})
export class MepsComponent implements OnInit, OnDestroy {

  private allMeps: Mep[];
  private sort: Sort;

  public meps: Mep[];
  public templates: Template[];
  public statuses: string[];

  public displayedColumns: string[] = ['name', 'status', 'project', 'dueDate', 'creationDate', 'lastModificationDate', 'closureDate', 'action'];

  public length = 0;
  public pageSize = 10;

  public projectControl = new FormControl();
  public statusControl = new FormControl();

  private subscriptions: Subscription[] = [];

  constructor(private appService: ApplicationService,
              private mepService: MepService,
              private templateService: TemplateService,
              public miscService: MiscService,
              public dialog: MatDialog) {

    this.sort = {active: 'dueDate', direction: 'desc'};
    this.statuses = ['En cours', 'Fermée'];
    this.appService.startLoading();
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
        this.length = this.allMeps.length;
        this.sortAllMeps();
        this.appService.stopLoading();
      })
      .catch(err => console.log(err));
  }

  public sortData(sort: Sort) {
    this.sort = sort;
    this.sortAllMeps();
  }

  private sortAllMeps() {
    if (this.sort && this.sort.active && this.sort.direction !== '') {
      this.allMeps = this.allMeps.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'name':
            return this.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
          case 'status':
            return this.compare(this.computeStatus(a), this.computeStatus(b), isAsc);
          case 'project':
            return this.compare(a.project.toLowerCase(), b.project.toLowerCase(), isAsc);
          case 'dueDate':
            return this.compare(a.dueDate, b.dueDate, isAsc);
          case 'creationDate':
            return this.compare(a.creationDate, b.creationDate, isAsc);
          case 'lastModificationDate':
            return this.compare(a.lastModificationDate, b.lastModificationDate, isAsc);
          case 'closureDate':
            return this.compare(a.closureDate, b.closureDate, isAsc);
          default:
            return 0;
        }
      });
    }

    this.updateMepsToDisplay();
    this.meps = this.allMeps.slice(0, this.pageSize);
  }

  private compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
