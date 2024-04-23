import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantInfoComponent } from './etudiant-info.component';

describe('EtudiantInfoComponent', () => {
  let component: EtudiantInfoComponent;
  let fixture: ComponentFixture<EtudiantInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
