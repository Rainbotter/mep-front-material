import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Template } from '../../../interfaces/responses/template/template';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TemplateService } from '../../../services/template.service';
import { RenameStepModalData } from '../../../interfaces/modals/RenameStepModalData';

@Component({
  selector: 'mep-rename-step-modal',
  templateUrl: './rename-step-modal.component.html',
  styleUrls: ['./rename-step-modal.component.css']
})
export class RenameStepModalComponent implements OnInit {

  public stepControl: FormGroup;

  public nameControl: FormControl;

  constructor(public dialogRef: MatDialogRef<RenameStepModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RenameStepModalData,
              private templateService: TemplateService,
              private _formBuilder: FormBuilder) {
    this.nameControl = this._formBuilder.control(data.step.name, Validators.required);

    this.stepControl = this._formBuilder.group({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

  public renameStep(): void {
    if (this.stepControl.valid) {
      this.templateService.renameStep(this.data.template.id, this.data.stepSet.id, this.data.step.id, this.nameControl.value)
        .then(res => {
          this.close(res);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.stepControl.markAllAsTouched();
      this.stepControl.markAsTouched();
    }
  }

  public close(template?: Template): void {
    this.dialogRef.close(template);
  }

}
