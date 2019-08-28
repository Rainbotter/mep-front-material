import { Component, OnInit, ViewChild } from '@angular/core';
import { Template } from '../../interfaces/responses/template/template';
import { MepService } from '../../services/mep.service';
import { TemplateService } from '../../services/template.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mep } from '../../interfaces/responses/mep/mep';
import { ApiService } from '../../services/api.service';
import { Api } from '../../interfaces/responses/mep/api';
import { MatTable } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'mep-mep-form',
  templateUrl: './mep-form.component.html',
  styleUrls: ['./mep-form.component.css']
})
export class MepFormComponent implements OnInit {

  public templates: Template[];
  public meps: Mep[];
  public apis: Api[];
  public apiTypes: string[];
  public projects: string[];

  public mepGroup: FormGroup;
  public apiFormGroup: FormGroup;

  public nameControl: FormControl;
  public projectControl: FormControl;
  public versionControl: FormControl;
  public templateControl: FormControl;

  public apiNameControl: FormControl;
  public apiMaintainerControl: FormControl;
  public apiTypeControl: FormControl;
  public apiOldVersionControl: FormControl;
  public apiNewVersionControl: FormControl;

  public loading: boolean;

  @ViewChild(MatTable, {static: false}) apiTable: MatTable<Api>;

  public displayedColumns: string[] = ['name', 'maintainer', 'type', 'newVersion', 'oldVersion', 'action'];

  constructor(private _formBuilder: FormBuilder,
              private mepService: MepService,
              private apiService: ApiService,
              private templateService: TemplateService,
              private router: Router) {

  }

  ngOnInit() {
    this.apis = [];
    this.loading = false;

    this.nameControl = this._formBuilder.control('', Validators.required);
    this.projectControl = this._formBuilder.control('', Validators.required);
    this.versionControl = this._formBuilder.control('', Validators.required);
    this.templateControl = this._formBuilder.control('', Validators.required);

    this.apiNameControl = this._formBuilder.control('', Validators.required);
    this.apiMaintainerControl = this._formBuilder.control('', Validators.required);
    this.apiTypeControl = this._formBuilder.control('RANCHER', Validators.required);
    this.apiOldVersionControl = this._formBuilder.control('', Validators.required);
    this.apiNewVersionControl = this._formBuilder.control('', Validators.required);

    this.mepGroup = this._formBuilder.group({
      nameControl: this.nameControl,
      projectControl: this.projectControl,
      versionControl: this.versionControl,
      templateControl: this.templateControl
    });

    this.apiFormGroup = this._formBuilder.group({
      apiNameControl: this.apiNameControl,
      apiMaintainerControl: this.apiMaintainerControl,
      apiTypeControl: this.apiTypeControl,
      apiOldVersionControl: this.apiOldVersionControl,
      apiNewVersionControl: this.apiNewVersionControl
    });

    this.templateService.getTemplates()
      .then(value => this.templates = value)
      .catch(err => {
      });

    this.mepService.getMeps()
      .then(value => {
        this.meps = value;
        this.projects = Array.from(new Set(this.meps.map(mep => mep.project)));
      })
      .catch(err => {
      });

    this.apiTypes = this.apiService.getTypes();

  }

  public apiFormSubmit() {
    if (this.apiFormGroup.valid) {
      const newApi = {
        name: this.apiNameControl.value,
        maintainer: this.apiMaintainerControl.value,
        type: this.apiTypeControl.value,
        newVersion: this.apiNewVersionControl.value,
        oldVersion: this.apiOldVersionControl.value
      };

      this.apis.push(newApi);
      this.apiTable.renderRows();

      this.apiNameControl.reset('');
      this.apiNameControl.markAsPristine();
      this.apiMaintainerControl.reset('');
      this.apiMaintainerControl.markAsPristine();
      this.apiTypeControl.reset('RANCHER');
      this.apiTypeControl.markAsPristine();
      this.apiNewVersionControl.reset('');
      this.apiNewVersionControl.markAsPristine();
      this.apiOldVersionControl.reset('');
      this.apiOldVersionControl.markAsPristine();
    }
  }

  public removeApiFromList(apiToRemove: Api) {
    const index = this.apis.indexOf(apiToRemove);
    if (index > -1) {
      this.apis.splice(index, 1);
    }

    this.apiTable.renderRows();
  }

  public createMep(): void {
    if (this.canSubmit()) {
      this.loading = true;
      this.mepService.createMep(this.nameControl.value, this.projectControl.value, this.versionControl.value, this.templateControl.value.id)
        .then(res => {
          const apisCalls = [];
          this.apis.forEach(api =>
            apisCalls.push(this.apiService.createApi(res.id, api.name, api.maintainer, api.type, api.oldVersion, api.newVersion))
          );

          Promise.all(apisCalls)
            .then(value => this.router.navigate(['/meps']))
            .catch(err => console.log(err));

        })
        .catch(err => {
          this.loading = false;
        });
    }
  }

  public canSubmit(): boolean {
    return this.mepGroup.valid && this.apis.length > 0;
  }

}
