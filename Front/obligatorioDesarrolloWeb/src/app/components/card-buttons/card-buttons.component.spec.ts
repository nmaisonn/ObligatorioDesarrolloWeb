import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonsComponent } from './card-buttons.component';

describe('CardButtonsComponent', () => {
  let component: CardButtonsComponent;
  let fixture: ComponentFixture<CardButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
