import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucceseComponent } from './succese.component';

describe('SucceseComponent', () => {
  let component: SucceseComponent;
  let fixture: ComponentFixture<SucceseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucceseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucceseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
