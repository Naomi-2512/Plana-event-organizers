import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ResetComponent } from './components/reset/reset.component';
import { UserDashboardComponent } from './components/User/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/User/user-profile/user-profile.component';
import { UserEventsComponent } from './components/User/user-events/user-events.component';
import { UserBookedComponent } from './components/User/user-booked/user-booked.component';
import { UserLogoutComponent } from './components/User/user-logout/user-logout.component';
import { OrganizerHomeComponent } from './components/Organizer/organizer-home/organizer-home.component';
import { OrganizerDashboardComponent } from './components/Organizer/organizer-dashboard/organizer-dashboard.component';
import { OrganizerProfileComponent } from './components/Organizer/organizer-profile/organizer-profile.component';
import { OrganizerUsersComponent } from './components/Organizer/organizer-users/organizer-users.component';
import { OrganizerEventsComponent } from './components/Organizer/organizer-events/organizer-events.component';
import { OrganizerLogoutComponent } from './components/Organizer/organizer-logout/organizer-logout.component';
import { AdminHomeComponent } from './components/Admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './components/Admin/admin-profile/admin-profile.component';
import { AdminUsersComponent } from './components/Admin/admin-users/admin-users.component';
import { AdminPendingComponent } from './components/Admin/admin-pending/admin-pending.component';
import { AdminLogoutComponent } from './components/Admin/admin-logout/admin-logout.component';
import { AdminApprovedComponent } from './components/Admin/admin-approved/admin-approved.component';

export const routes: Routes = [
    {path: '' , component:LandingPageComponent},
    {path: 'register' , component:RegistrationComponent},
    {path: 'login' , component:LoginComponent},
    {path: 'resetPassword', component:ResetComponent},
    {path: 'user', component:UserDashboardComponent , children: [
        {path: 'profile', component: UserProfileComponent},
        {path: 'events', component: UserEventsComponent},
        {path: 'booked', component: UserBookedComponent},
        {path: 'logout', component: UserLogoutComponent},
        {path: '', redirectTo: 'profile',pathMatch: 'full'}
    ]},
    {path: 'organizer', component:OrganizerHomeComponent , children: [
        {path: 'dashboard', component: OrganizerDashboardComponent},
        {path: 'profile', component: OrganizerProfileComponent},
        {path: 'users', component: OrganizerUsersComponent},
        {path: 'events', component: OrganizerEventsComponent},
        {path: 'logout', component: OrganizerLogoutComponent},
        {path: '', redirectTo: 'profile',pathMatch: 'full'}
    ]},
    {path: 'admin', component: AdminHomeComponent , children: [
        {path: 'dashboard', component: AdminDashboardComponent},
        {path: 'profile', component: AdminProfileComponent},
        {path: 'users', component: AdminUsersComponent},
        {path: 'pending', component: AdminPendingComponent},
        {path: 'approved', component: AdminApprovedComponent},
        {path: 'logout', component: AdminLogoutComponent},
        {path: '', redirectTo: 'profile',pathMatch: 'full'}
    ]}
];
