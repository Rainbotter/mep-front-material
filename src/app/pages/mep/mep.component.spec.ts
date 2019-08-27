import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MepComponent } from './mep.component';

describe('MepComponent', () => {
  let component: MepComponent;
  let fixture: ComponentFixture<MepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
