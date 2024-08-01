import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserInfoComponent } from './activate-user-info.component';

describe('ActivateUserInfoComponent', () => {
  let component: ActivateUserInfoComponent;
  let fixture: ComponentFixture<ActivateUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateUserInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
