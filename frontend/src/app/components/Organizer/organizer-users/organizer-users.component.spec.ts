import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerUsersComponent } from './organizer-users.component';

describe('OrganizerUsersComponent', () => {
  let component: OrganizerUsersComponent;
  let fixture: ComponentFixture<OrganizerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
