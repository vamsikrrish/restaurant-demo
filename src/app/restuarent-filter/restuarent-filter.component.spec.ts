import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarentFilterComponent } from './restuarent-filter.component';

describe('RestuarentFilterComponent', () => {
  let component: RestuarentFilterComponent;
  let fixture: ComponentFixture<RestuarentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestuarentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestuarentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
