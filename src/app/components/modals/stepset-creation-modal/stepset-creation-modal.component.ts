import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TemplateService } from '../../services/template.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Template } from '../../interfaces/responses/template/template';
import { StepSetCreationModalData } from '../../interfaces/modals/StepSetCreationModalData';

@Component({
  selector: 'mep-stepset-creation-modal',
  templateUrl: './stepset-creation-modal.component.html',
  styleUrls: ['./stepset-creation-modal.component.css']
})
export class StepsetCreationModalComponent implements OnInit {

  public stepSetControl: FormGroup;

  public nameControl: FormControl;

  constructor(public dialogRef: MatDialogRef<StepsetCreationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StepSetCreationModalData,
              private templateService: TemplateService,
              private _formBuilder: FormBuilder) {
    this.nameControl = this._formBuilder.control('', Validators.required);

    this.stepSetControl = this._formBuilder.group({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

  public CreateStepSet(): void {
    if (this.stepSetControl.valid) {
      this.templateService.createStepSet(this.data.template.id, this.nameControl.value)
        .then(res => {
          this.close(res);
        })
        .catch(err => {
          console.error(err);
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
