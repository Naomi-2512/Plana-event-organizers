import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../../../interfaces/interface';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  users: Users[] = [];

  constructor(private userService:UsersService){
    this.getManagers();
  }

  getManagers(){
    this.userService.getapproveManagers().subscribe(res=>{
      this.users = res.users;
    })
  }
}
