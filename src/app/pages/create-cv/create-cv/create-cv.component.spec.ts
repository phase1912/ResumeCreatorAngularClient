import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCvComponent } from './create-cv.component';

describe('CreateCvComponent', () => {
  let component: CreateCvComponent;
  let fixture: ComponentFixture<CreateCvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCvComponent]
    });
    fixture = TestBed.createComponent(CreateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
