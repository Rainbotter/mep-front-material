import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MepsComponent } from './meps.component';

describe('MepsComponent', () => {
  let component: MepsComponent;
  let fixture: ComponentFixture<MepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
