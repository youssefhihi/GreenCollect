import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { isAuthGuard } from '../../core/guards/is-auth.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent },
   {  
      path: '', 
      component: ProfileComponent, 
      canActivate:[isAuthGuard],
      children: [
       
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }