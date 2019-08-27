import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MepFormComponent } from './mep-form.component';

describe('MepFormComponent', () => {
  let component: MepFormComponent;
  let fixture: ComponentFixture<MepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
