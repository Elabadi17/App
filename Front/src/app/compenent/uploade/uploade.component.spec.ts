import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadeComponent } from './uploade.component';

describe('UploadeComponent', () => {
  let component: UploadeComponent;
  let fixture: ComponentFixture<UploadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
