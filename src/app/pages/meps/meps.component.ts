import { Component, OnDestroy, OnInit } from '@angular/core';
import { MepService } from '../../services/mep.service';
import { Mep } from '../../interfaces/responses/mep/mep';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mep-meps',
  templateUrl: './meps.component.html',
  styleUrls: ['./meps.component.css']
})
export class MepsComponent implements OnInit, OnDestroy {

  private allMeps: Mep[];

  public meps: Mep[];
  public projects: string[];
  public statuses: string[];

  public displayedColumns: string[] = ['name', 'status', 'project', 'creationDate', 'lastModificationDate', 'closureDate', 'action'];

  public projectControl = new FormControl();
  public statusControl = new FormControl();

  private subscriptions: Subscription[] = [];

  constructor(private mepService: MepService) {
  }

  ngOnInit() {
    this.mepService.getMeps()
      .then(res => {
        this.allMeps = res;
        this.meps = this.allMeps;

        this.projects = Array.from(new Set(this.allMeps.map(mep => mep.project)));
        this.statuses = ['En cours', 'Fermée'];

      })
      .catch(err => console.log(err));

    this.subscriptions.push(this.projectControl.valueChanges.subscribe(value => {
      this.updateMepsToDisplay();
    }));

    this.subscriptions.push(this.statusControl.valueChanges.subscribe(value => {
      this.updateMepsToDisplay();
    }));
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
  }

}
