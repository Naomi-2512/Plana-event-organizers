import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  errorMessage:string = '';
  success:string = '';
  display = {};


  registrationForm!:FormGroup;

  constructor(private router:Router, private userService:UsersService, private formbuilder:FormBuilder){
    this.registrationForm = this.formbuilder.group({
      userName: ['', [Validators.required]],
      profileImage: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password:['', [Validators.required,validatePassword()]],
      confirmPassword:['',[Validators.required,validatePassword()]],
      phoneNumber: ['', [Validators.required]],
      location: ['', [Validators.required]],
      userRole: ['', [Validators.required]]
    })
  }

  profilePhoto(event:any){
    const photo = event.target.files[0];

    const data = new FormData();
    data.append('file',photo);
    data.append('upload_preset','planaProject');
    data.append('cloud_name','dqxwy25mr');

    fetch('https://api.cloudinary.com/v1_1/dqxwy25mr/image/upload', {
      method: 'POST',
      body: data
    }).then(res=>res.json()).then(res=>{
      this.registrationForm.patchValue({profileImage: res.url})
      
    })
    
  } 

  registerUser(){
    if(!(this.registrationForm.get('password')?.value == this.registrationForm.get('confirmPassword')?.value)){
      this.errorMessage = 'your passwords do not match';
        this.display = {
          'background-color':'red',
          'display':'flex'
        }
        setTimeout(()=>{
          this.errorMessage = '',
          this.display = {}
        },5000)
    }
    else {
      const formValue = {...this.registrationForm.value};
      delete formValue.confirmPassword ;
      this.userService.registerUser(formValue).subscribe(res=>{
        if(res.error){
          this.errorMessage = res.error;
          this.display = {
            'background-color':'red',
            'display':'flex'
          }
          setTimeout(()=>{
            this.errorMessage = '',
            this.display = {}
          },5000)
        }
        else if(res.message){
          this.success = res.message;
          this.display = {
            'background-color':'green',
            'display':'flex'
          }
          setTimeout(()=>{
            this.success = '',
            this.display = {}
            this.router.navigate(['/login'])
          },5000)
        }
      })
    }
    
  }

}

function validatePassword():ValidatorFn {
  return (control:AbstractControl):ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null;
    }
    let upperCase = /[A-Z]+/.test(value);
    let lowerCase = /[a-z]+/.test(value);
    let number = /[0-9]+/.test(value);

    const validPassword = upperCase && lowerCase && number;
    return !validPassword ? {passwordStrength:true}:null
  }
}
