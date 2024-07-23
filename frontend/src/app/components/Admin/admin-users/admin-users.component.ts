import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Users } from '../../../interfaces/interface';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users:Users[] = [];
  userId!:Users;

  constructor(private userService:UsersService){
    this.getManagers();
  }

  getManagers(){
    this.userService.getUserByRole().subscribe(res=>{
      this.users = res.users;
    })
  }

  approveAllManagers(){
    this.userService.updateAllUsersRoleByAdmin().subscribe(res=>{
      console.log(res.error);
      
    })
  }

  approveOneManager(userId:string){
    console.log(userId);
    
    this.userService.updateuserRoleByAdmin(userId).subscribe(res=>{
      console.log(res);
      
    })
  }

}
