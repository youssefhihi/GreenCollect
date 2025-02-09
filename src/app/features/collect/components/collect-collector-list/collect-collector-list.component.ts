import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Collect } from '../../../../model/collect/collect.modul';

@Component({
  selector: 'app-collect-collector-list',
  standalone: false,
  
  templateUrl: './collect-collector-list.component.html',
  styleUrl: './collect-collector-list.component.css'
})
export class CollectCollectorListComponent {

 private route = inject(ActivatedRoute);
  private store = inject(Store);

  collectRequests: Collect[] = [];
  successMessage: string | null = null;

  constructor() {
    this.route.data.subscribe(data => {
      this.collectRequests = data['collectRequests'];;
    });
  }









  handleError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/noImg.jpg';
  }
 
}
