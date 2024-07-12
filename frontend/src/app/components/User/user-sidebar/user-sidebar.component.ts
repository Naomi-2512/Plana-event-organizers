import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule,UserSidebarComponent,UserProfileComponent,RouterOutlet],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {

}
