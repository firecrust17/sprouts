import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SproutsComponent } from './sprouts.component';

describe('SproutsComponent', () => {
  let component: SproutsComponent;
  let fixture: ComponentFixture<SproutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SproutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SproutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
