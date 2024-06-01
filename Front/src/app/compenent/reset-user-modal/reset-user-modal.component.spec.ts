import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetUserModalComponent } from './reset-user-modal.component';

describe('ResetUserModalComponent', () => {
  let component: ResetUserModalComponent;
  let fixture: ComponentFixture<ResetUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetUserModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
