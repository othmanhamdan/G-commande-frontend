import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcNonCloturerComponent } from './bc-non-cloturer.component';

describe('BcNonCloturerComponent', () => {
  let component: BcNonCloturerComponent;
  let fixture: ComponentFixture<BcNonCloturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BcNonCloturerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BcNonCloturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
