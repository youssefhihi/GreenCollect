import { Component } from '@angular/core';
import { UserInfoService } from '../../core/service/user-info.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 isClient: boolean = false;


  constructor(private userInfoService: UserInfoService) {}
ngOnInit() {
    this.userInfoService.getAuthUser().pipe(
      map((user) => {
        if (user) {
          this.isClient = user.role === 'client';
        }
      }
    )).subscribe();
  }
}
