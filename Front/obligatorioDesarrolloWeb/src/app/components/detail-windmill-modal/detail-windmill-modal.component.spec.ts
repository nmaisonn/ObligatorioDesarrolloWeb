import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWindmillModalComponent } from './detail-windmill-modal.component';

describe('DetailWindmillModalComponent', () => {
  let component: DetailWindmillModalComponent;
  let fixture: ComponentFixture<DetailWindmillModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailWindmillModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailWindmillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
