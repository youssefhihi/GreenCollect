import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { ToastAlertComponent } from './components/toast-alert/toast-alert.component';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    SvgIconComponent,
    ToastAlertComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SvgIconComponent,
    ToastAlertComponent,
    FooterComponent
  ]
})
export class SharedModule { }
