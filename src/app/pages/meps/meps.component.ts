import { Component, OnInit } from '@angular/core';
import { MepService } from '../../services/mep.service';
import { Mep } from '../../interfaces/responses/mep/mep';

@Component({
  selector: 'mep-meps',
  templateUrl: './meps.component.html',
  styleUrls: ['./meps.component.css']
})
export class MepsComponent implements OnInit {

  public meps: Mep[];

  public displayedColumns: string[] = ['name', 'status', 'project', 'creationDate', 'lastModificationDate', 'closureDate', 'action'];

  constructor(private mepService: MepService) {
  }

  ngOnInit() {
    this.mepService.getMeps()
      .then(res => this.meps = res)
      .catch(err => console.log(err));
  }

  public computeStatus(mep: Mep): string {
    if (mep.closureDate) {
      return 'Fermée';
    } else {
      return 'En cours';
    }
  }

}
