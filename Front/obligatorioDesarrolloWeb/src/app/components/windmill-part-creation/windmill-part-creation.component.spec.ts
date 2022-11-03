import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindmillPartCreationComponent } from './windmill-part-creation.component';

describe('WindmillPartCreationComponent', () => {
  let component: WindmillPartCreationComponent;
  let fixture: ComponentFixture<WindmillPartCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindmillPartCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindmillPartCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
