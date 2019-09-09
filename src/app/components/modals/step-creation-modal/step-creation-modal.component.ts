import { Component, Inject, OnInit } from '@angular/core';
import { Template } from '../../interfaces/responses/template/template';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TemplateService } from '../../services/template.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepCreationModalData } from '../../interfaces/modals/StepCreationModalData';

@Component({
  selector: 'mep-step-creation-modal',
  templateUrl: './step-creation-modal.component.html',
  styleUrls: ['./step-creation-modal.component.css']
})
export class StepCreationModalComponent implements OnInit {

  public stepControl: FormGroup;

  public nameControl: FormControl;

  constructor(public dialogRef: MatDialogRef<StepCreationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StepCreationModalData,
              private templateService: TemplateService,
              private _formBuilder: FormBuilder) {
    this.nameControl = this._formBuilder.control('', Validators.required);

    this.stepControl = this._formBuilder.group({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

  public CreateStep(): void {
    if (this.stepControl.valid) {
      this.templateService.createStep(this.data.template.id, this.data.stepSet.id, this.nameControl.value)
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
