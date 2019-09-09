import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TemplateService } from '../../../services/template.service';
import { Template } from '../../../interfaces/responses/template/template';
import { TemplateCreationModalData } from '../../../interfaces/modals/TemplateCreationModalData';

@Component({
  selector: 'mep-template-creation-modal',
  templateUrl: './template-creation-modal.component.html',
  styleUrls: ['./template-creation-modal.component.css']
})
export class TemplateCreationModalComponent implements OnInit {

  public templateGroup: FormGroup;

  public nameControl: FormControl;

  constructor(public dialogRef: MatDialogRef<TemplateCreationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TemplateCreationModalData,
              private templateService: TemplateService,
              private _formBuilder: FormBuilder) {
    this.nameControl = this._formBuilder.control('', Validators.required);

    this.templateGroup = this._formBuilder.group({
      nameControl: this.nameControl
    });
  }

  ngOnInit() {
  }

  public createTemplate(): void {
    if (this.templateGroup.valid) {
      this.templateService.createTemplate(this.nameControl.value)
        .then(res => {
          this.close(res);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.templateGroup.markAllAsTouched();
      this.templateGroup.markAsTouched();
    }
  }

  public close(template?: Template): void {
    this.dialogRef.close(template);
  }

}
