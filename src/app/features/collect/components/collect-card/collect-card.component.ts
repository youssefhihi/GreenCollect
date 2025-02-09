import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Collect } from '../../../../model/collect/collect.modul';
import { DeleteCollectActions } from '../../../../state/actions/collect/collect.actions';
import { Store } from '@ngrx/store';
import { selectCollectSuccess } from '../../../../state/selectors/collect/collect.selectors';

@Component({
  selector: 'app-collect-card',
  standalone: false,
  
  templateUrl: './collect-card.component.html',
  styleUrl: './collect-card.component.css'
})
export class CollectCardComponent {
    private store = inject(Store);
  
  @Input() collect: Collect | null = null;
  @Output() collectDeleted = new EventEmitter<string>();
  
  popupVisible = false;
  
  handleError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/noImg.jpg';
  }
   photoUrl(): string {
    return this.collect?.photos?.length ? this.collect.photos[0] : 'assets/imgs/noImg.jpg';
  }
  
  
  deleteCollect() {
    if (this.collect?.id == undefined) return;
    this.popupVisible = false;
    this.store.dispatch(DeleteCollectActions.deleteCollectDelete({ id: this.collect?.id }));
  
    this.store.select(selectCollectSuccess).subscribe((success) => {
      if (success === 'Collection successfully deleted') {
        this.collectDeleted.emit(this.collect?.id);
        console.log('deleted');
      }
    });
  }
  

}