import { Component, OnDestroy, OnInit } from '@angular/core';
import { Template } from '../../interfaces/responses/template/template';
import { TemplateService } from '../../services/template.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../interfaces/enums/status';

@Component({
  selector: 'mep-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, OnDestroy {

  private template: Template;

  private subscriptions: Subscription[];

  public statuses: string[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private templateService: TemplateService) {
    this.subscriptions = [];
    this.statuses = [Status.OK, Status.PENDING, Status.NOK, Status.NA];
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      this.templateService.getTemplate(params['id'])
        .then(res => this.template = res)
        .catch(err => console.log(err));
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => {
      el.unsubscribe();
    });
  }

  public addStepset(): void {

  }

  public addStep(setStepId: string): void {

  }

}
