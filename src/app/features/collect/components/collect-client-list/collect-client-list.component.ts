import { Component, inject } from '@angular/core';
import { Collect } from '../../../../model/collect/collect.modul';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCollectSuccess } from '../../../../state/selectors/collect/collect.selectors';

@Component({
  selector: 'app-collect-client-list',
  standalone: false,
  
  templateUrl: './collect-client-list.component.html',
  styleUrl: './collect-client-list.component.css'
})
export class CollectClientListComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  collectRequests: Collect[] = [];
  successMessage: string | null = null;

  constructor() {
    this.route.data.subscribe(data => {
      this.collectRequests = data['collectRequests'];;
    });
  }
  
  onCollectDeleted(deletedCollectId: string) {
    console.log("sdsdzezd",deletedCollectId);
    this.collectRequests = this.collectRequests.filter(collect => collect.id !== deletedCollectId);
    this.successMessage = 'Collection successfully deleted!';
    setTimeout(() => {
      this.successMessage = null; 
    }, 3000);
  }
 
}
