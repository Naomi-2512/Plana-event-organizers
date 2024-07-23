import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Logins } from '../../interfaces/interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage:string = '';
  success:string = '';
  display = {};

  constructor(private userService:UsersService,private router:Router){}
  loginUser(login:Logins){
   
    this.userService.loginUser(login).subscribe(res=>{
      if(res.error ){
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

          localStorage.setItem('token',res.token as string)
          if(res.userRole == 'admin'){
            this.router.navigate(['/admin'])
          }
          else if(res.userRole == 'manager'){
            this.router.navigate(['/organizer'])
          }
          else if(res.userRole == 'attendee'){
            this.router.navigate(['/user'])
          }
          
        },5000)
      }
      
      
    })
    
  }
}

