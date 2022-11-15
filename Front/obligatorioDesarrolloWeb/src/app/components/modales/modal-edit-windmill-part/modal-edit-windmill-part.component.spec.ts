import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditWindmillPartComponent } from './modal-edit-windmill-part.component';

describe('ModalEditWindmillPartComponent', () => {
  let component: ModalEditWindmillPartComponent;
  let fixture: ComponentFixture<ModalEditWindmillPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditWindmillPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditWindmillPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
