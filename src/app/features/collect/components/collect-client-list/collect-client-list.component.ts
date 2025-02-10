import { Component, inject } from '@angular/core';
import { Collect } from '../../../../model/collect/collect.modul';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCollectSuccess } from '../../../../state/selectors/collect/collect.selectors';
import { selectPointsState, selectUserPoints } from '../../../../state/selectors/points/points.selectors';
import { PointsActions } from '../../../../state/actions/points/points.actions';

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
  points$ = this.store.select(selectUserPoints);
  success$ = this.store.select(selectCollectSuccess);

  constructor() {
    this.route.data.subscribe(data => {
      this.collectRequests = data['collectRequests'];;
    });
  }
  ngOnInit() {
    this.store.dispatch(PointsActions.loadUserPoints({ userId: this.collectRequests[0].user.id }));
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
