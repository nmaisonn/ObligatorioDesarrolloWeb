import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPartComponent } from './modal-add-part.component';

describe('ModalAddPartComponent', () => {
  let component: ModalAddPartComponent;
  let fixture: ComponentFixture<ModalAddPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
