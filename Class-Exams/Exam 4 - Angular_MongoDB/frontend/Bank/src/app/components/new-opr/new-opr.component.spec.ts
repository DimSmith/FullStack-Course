import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOprComponent } from './new-opr.component';

describe('NewOprComponent', () => {
  let component: NewOprComponent;
  let fixture: ComponentFixture<NewOprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOprComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
