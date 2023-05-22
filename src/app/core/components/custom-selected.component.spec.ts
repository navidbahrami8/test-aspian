import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectedComponent } from './custom-selected.component';

describe('CustomSelectedComponent', () => {
  let component: CustomSelectedComponent;
  let fixture: ComponentFixture<CustomSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
