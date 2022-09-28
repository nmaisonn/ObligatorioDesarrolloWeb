import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindmillPartComponent } from './windmill-part.component';

describe('WindmillPartComponent', () => {
  let component: WindmillPartComponent;
  let fixture: ComponentFixture<WindmillPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindmillPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindmillPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
