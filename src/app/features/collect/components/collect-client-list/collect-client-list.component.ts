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

  money = 0;
  points$ = this.store.select(selectUserPoints);
  
    collectRequests: Collect[] = [];
    successMessage: string | null = null;
  success$ = this.store.select(selectCollectSuccess);

  constructor() {
    this.route.data.subscribe(data => {
      this.collectRequests = data['collectRequests'];;
    });
  }
  calculateMoneyFromPoints(points: number): number {
    let money = 0;
  
    // Priorité aux bons de valeur la plus élevée
    while (points >= 500) {
      money += 350;
      points -= 500;
    }
    while (points >= 200) {
      money += 120;
      points -= 200;
    }
    while (points >= 100) {
      money += 50;
      points -= 100;
    }
  
    return money;
  }
  
  ngOnInit() {
    this.points$.subscribe(points => {
      if (points !== null && points !== undefined) {
        this.money = this.calculateMoneyFromPoints(points.totalPoints);
      }
    });
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
