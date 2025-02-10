import { Component } from '@angular/core';
import { UserInfoService } from '../../core/service/user-info.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: false,
  
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  isAuthenticated: boolean = false;
  isClient: boolean = false;


  constructor(private userInfoService: UserInfoService) {}
  
  
  ngOnInit() {
    this.userInfoService.getAuthUser().pipe(
      map((user) => {
        if (user) {
          this.isAuthenticated = true;
          this.isClient = user.role === 'client';
        }
      }
    )).subscribe();
  }
  
}
