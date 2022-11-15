import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddWindmillPartComponent } from './modal-add-windmill-part.component';

describe('ModalAddWindmillPartComponent', () => {
  let component: ModalAddWindmillPartComponent;
  let fixture: ComponentFixture<ModalAddWindmillPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddWindmillPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddWindmillPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
