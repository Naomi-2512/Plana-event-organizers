import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,RouterModule,],
  templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.css'
})
export class AdminLogoutComponent {

}
