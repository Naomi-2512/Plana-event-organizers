import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

import { of, throwError } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

class RegistrerUsersService {
  registerUser(user: any) {
    return of({ message: 'Registration successful' });
  }
}

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService:UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [RegistrationComponent],
      providers: [{ provide: UsersService, useClass: RegistrerUsersService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should contain these controls', () => {
    expect(component.registrationForm.contains('userName')).toBeTruthy();
    expect(component.registrationForm.contains('profileImage')).toBeTruthy();
    expect(component.registrationForm.contains('email')).toBeTruthy();
    expect(component.registrationForm.contains('password')).toBeTruthy();
    expect(component.registrationForm.contains('confirmPassword')).toBeTruthy();
    expect(component.registrationForm.contains('phoneNumber')).toBeTruthy();
    expect(component.registrationForm.contains('location')).toBeTruthy();
    expect(component.registrationForm.contains('userRole')).toBeTruthy();
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.registrationForm.setValue({
      userName: '',
      profileImage: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      location: '',
      userRole: ''
    });

    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should display an error message if passwords do not match', fakeAsync(() => {
    component.registrationForm.setValue({
      userName: 'testuser',
      profileImage: 'testimage.jpg',
      email: 'test@example.com',
      password: 'Test123',
      confirmPassword: 'Test456',
      phoneNumber: '1234567890',
      location: 'test location',
      userRole: 'attendee'
    });

    component.registerUser();
    tick(5000);

    expect(component.errorMessage).toBe('your passwords do not match');
  }));

  it('should display success message upon successful registration', fakeAsync(() => {
    component.registrationForm.setValue({
      userName: 'exampleuser',
      profileImage: 'exampleimage.jpg',
      email: 'test@example.com',
      password: 'Example123',
      confirmPassword: 'Example123',
      phoneNumber: '0756435788',
      location: 'example location',
      userRole: 'attendee'
    });

    component.registerUser();
    tick(5000);

    expect(component.success).toBe('Registration successful');
  }));

  it('should call profilePhoto method when an image is selected', () => {
    spyOn(component, 'profilePhoto');
    const input = fixture.debugElement.nativeElement.querySelector('input[type="file"]');
    const event = new Event('change');
    input.dispatchEvent(event);

    fixture.whenStable().then(() => {
      expect(component.profilePhoto).toHaveBeenCalled();
    });
  });

});
