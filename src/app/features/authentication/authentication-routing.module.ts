import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { isAuthGuard } from '../../core/guards/is-auth.guard';
import { notAuthGuard } from '../../core/guards/authentication/not-auth.guard';

  const routes: Routes = [
    {  
      path: '', 
      component: AuthenticationComponent, 
      canActivate: [notAuthGuard],
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
