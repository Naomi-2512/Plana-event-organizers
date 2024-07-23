import { Component } from '@angular/core';
import { Users } from '../../../interfaces/interface';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  users:Users[] = [];

  constructor(private userService:UsersService) {
    this.getProfile();
  }
  getProfile(){
    this.userService.getUserById().subscribe(res=>{
      this.users = res.user;
      console.log(res);
      
      
    })
  }
}
