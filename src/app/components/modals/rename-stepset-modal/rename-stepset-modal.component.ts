import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TemplateService } from '../../../services/template.service';
import { RenameStepSetModalData } from '../../../interfaces/modals/RenameStepSetModalData';
import { Template } from '../../../interfaces/responses/template/template';
import { SnackService } from '../../../services/snack.service';

@Component({
  selector: 'mep-rename-stepset-modal',
  templateUrl: './rename-stepset-modal.component.html',
  styleUrls: ['./rename-stepset-modal.component.css']
})
export class RenameStepsetModalComponent implements OnInit {

  public stepSetControl: FormGroup;

  public nameControl: FormControl;

  constructor(public dialogRef: MatDialogRef<RenameStepsetModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RenameStepSetModalData,
              private templateService: TemplateService,
              private snackService: SnackService,
              private _formBuilder: FormBuilder) {
    this.nameControl = this._formBuilder.control(data.stepSet.name, Validators.required);

    this.stepSetControl = this._formBuilder.group({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

  public renameStepSet(): void {
    if (this.stepSetControl.valid) {
      this.templateService.renameStepSet(this.data.template.id, this.data.stepSet.id, this.nameControl.value)
        .then(res => {
          this.close(res);
          this.snackService.openActionSucceedSnack();
        })
        .catch(err => {
          this.snackService.openErrorSnack('Une erreur est survenue lors du renommage de l\'ensemble: ' + err);
        });
    } else {
      this.stepSetControl.markAllAsTouched();
      this.stepSetControl.markAsTouched();
    }
  }

  public close(template?: Template): void {
    this.dialogRef.close(template);
  }

}
