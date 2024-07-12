import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,RouterModule],
  templateUrl: './user-logout.component.html',
  styleUrl: './user-logout.component.css'
})
export class UserLogoutComponent {

}
