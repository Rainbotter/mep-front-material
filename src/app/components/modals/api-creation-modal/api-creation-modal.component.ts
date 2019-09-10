import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mep } from '../../../interfaces/responses/mep/mep';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiCreationModalData } from '../../../interfaces/modals/ApiCreationModalData';
import { ApiService } from '../../../services/api.service';
import { Type } from '../../../interfaces/enums/type';
import { MiscService } from '../../../services/misc.service';

@Component({
  selector: 'mep-api-creation-modal',
  templateUrl: './api-creation-modal.component.html',
  styleUrls: ['./api-creation-modal.component.css']
})
export class ApiCreationModalComponent implements OnInit {

  public apiGroup: FormGroup;

  public nameControl: FormControl;
  public typeControl: FormControl;

  public types = [Type.RANCHER, Type.DOCKER];

  constructor(public dialogRef: MatDialogRef<ApiCreationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ApiCreationModalData,
              private apiService: ApiService,
              private _formBuilder: FormBuilder,
              public miscService: MiscService) {

    this.nameControl = this._formBuilder.control('', Validators.required);
    this.typeControl = this._formBuilder.control('', Validators.required);

    this.apiGroup = this._formBuilder.group({
      nameControl: this.nameControl,
      projectControl: this.typeControl
    });
  }

  ngOnInit() {
  }

  public addApi(): void {
    if (this.apiGroup.valid) {
      this.apiService.createApi(this.data.mep.id, this.nameControl.value, this.typeControl.value)
        .then(res => {
          this.close(res);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.apiGroup.markAllAsTouched();
      this.apiGroup.markAsTouched();
    }
  }

  public close(mep?: Mep): void {
    this.dialogRef.close(mep);
  }

}
