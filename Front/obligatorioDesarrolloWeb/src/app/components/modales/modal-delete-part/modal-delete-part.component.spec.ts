import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePartComponent } from './modal-delete-part.component';

describe('ModalDeletePartComponent', () => {
  let component: ModalDeletePartComponent;
  let fixture: ComponentFixture<ModalDeletePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
