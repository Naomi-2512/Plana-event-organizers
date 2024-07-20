import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  profileImage:string = '';


  registrationForm!:FormGroup;

  constructor(private router:Router, private userService:UsersService, private formbuilder:FormBuilder){
    this.registrationForm = this.formbuilder.group({
      userName: ['', Validators.required],
      profileImage: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['',Validators.required],
      phoneNumber: ['', Validators.required],
      location: ['', Validators.required],
      userRole: ['', Validators.required]
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
      console.log(res.url);
      
    })
    
  } 

}
