import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MepCreationModalData } from '../../interfaces/modals/MepCreationModalData';
import { MepService } from '../../services/mep.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mep } from '../../interfaces/responses/mep/mep';

@Component({
  selector: 'mep-mep-creation-modal',
  templateUrl: './mep-creation-modal.component.html',
  styleUrls: ['./mep-creation-modal.component.css']
})
export class MepCreationModalComponent implements OnInit {

  public projects: string[];

  public mepGroup: FormGroup;

  public nameControl: FormControl;
  public projectControl: FormControl;
  public templateControl: FormControl;

  constructor(public dialogRef: MatDialogRef<MepCreationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MepCreationModalData,
              private mepService: MepService,
              private _formBuilder: FormBuilder) {
    this.projects = Array.from(new Set(this.data.meps.map(mep => mep.project)));

    this.nameControl = this._formBuilder.control('', Validators.required);
    this.projectControl = this._formBuilder.control('', Validators.required);
    this.templateControl = this._formBuilder.control('', Validators.required);

    this.mepGroup = this._formBuilder.group({
      nameControl: this.nameControl,
      projectControl: this.projectControl,
      templateControl: this.templateControl
    });

  }

  ngOnInit() {
  }

  public createMep(): void {
    if (this.mepGroup.valid) {
      this.mepService.createMep(this.nameControl.value, this.projectControl.value, this.templateControl.value.id)
        .then(res => {
          this.close(res);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.mepGroup.markAllAsTouched();
      this.mepGroup.markAsTouched();
    }
  }

  public close(mep?: Mep): void {
    this.dialogRef.close(mep);
  }

}
