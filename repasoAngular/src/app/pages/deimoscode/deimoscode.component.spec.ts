import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeimoscodeComponent } from './deimoscode.component';

describe('DeimoscodeComponent', () => {
  let component: DeimoscodeComponent;
  let fixture: ComponentFixture<DeimoscodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeimoscodeComponent]
    });
    fixture = TestBed.createComponent(DeimoscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
