import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMenuPageComponent } from './start-menu-page.component';

describe('StartMenuPageComponent', () => {
  let component: StartMenuPageComponent;
  let fixture: ComponentFixture<StartMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartMenuPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
