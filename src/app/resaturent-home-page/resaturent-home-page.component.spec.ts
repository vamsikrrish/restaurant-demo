import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaturentHomePageComponent } from './resaturent-home-page.component';

describe('ResaturentHomePageComponent', () => {
  let component: ResaturentHomePageComponent;
  let fixture: ComponentFixture<ResaturentHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResaturentHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaturentHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
