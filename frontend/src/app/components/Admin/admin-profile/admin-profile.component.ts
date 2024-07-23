import { Component } from '@angular/core';
import { Users } from '../../../interfaces/interface';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
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
