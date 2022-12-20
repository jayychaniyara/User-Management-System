import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsManagementComponent } from './docs-management/docs-management.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { LoginSuccessfulComponent } from './login-successful/login-successful.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterSuccessfulComponent } from './register-successful/register-successful.component';
import { RegisterComponent } from './register/register.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'groupChat/:id',
    component: GroupChatComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'loginSuccessful/:id',
    component: LoginSuccessfulComponent
  },
  {
    path: 'userManagement/:id',
    component: UsersManagementComponent
  },
  {
    path: 'docsManagemetn/:id',
    component: DocsManagementComponent
  },
  {
    path: 'logout/:id',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'registerSuccessful',
    component: RegisterSuccessfulComponent
  },
  {
    path: 'editUser/:id',
    component: EditUserComponent
  },
  {
    path: '**',
    redirectTo: 'welcome'
  },
  {
    path: 'navBar/:id',
    component: NavBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
