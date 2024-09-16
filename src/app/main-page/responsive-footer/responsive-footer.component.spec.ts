import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveFooterComponent } from './responsive-footer.component';

describe('ResponsiveFooterComponent', () => {
  let component: ResponsiveFooterComponent;
  let fixture: ComponentFixture<ResponsiveFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsiveFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
