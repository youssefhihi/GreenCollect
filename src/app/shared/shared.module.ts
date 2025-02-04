import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { ToastAlertComponent } from './components/toast-alert/toast-alert.component';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SvgIconComponent,
    ToastAlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SvgIconComponent,
    ToastAlertComponent
  ]
})
export class SharedModule { }
