import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Collect } from '../../../../model/collect/collect.modul';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateCollectStatusActions } from '../../../../state/actions/collect/collect.actions';
import { selectCollectError, selectCollectSuccess } from '../../../../state/selectors/collect/collect.selectors';
import { User } from '../../../../model/user/user.model';

@Component({
  selector: 'app-collect-collector-list',
  standalone: false,
  
  templateUrl: './collect-collector-list.component.html',
  styleUrl: './collect-collector-list.component.css'
})
export class CollectCollectorListComponent {

 private route = inject(ActivatedRoute);
  private store = inject(Store);
  private fb = inject(FormBuilder);
  updateStatusForm!: FormGroup;

  collectRequests: Collect[] = [];
  selectedCollect: Collect | null = null;
  popupVisible: boolean = false;
  successMessage$ =this.store.select(selectCollectSuccess);
  error$ = this.store.select(selectCollectError);

  ngOnInit() {
    this.updateStatusForm = this.fb.group({
      status: ['', [Validators.required, Validators.pattern(/^(En attente|Occupée|En cours|Validée|Rejetée)$/)]]
    });
  }

  onStatusChange(collect: Collect) {
    if (this.updateStatusForm.valid) {
      const updatedStatus = this.updateStatusForm.value.status;
      const updatedCollect = { ...collect, status: updatedStatus };
  
      // Dispatch action
      this.store.dispatch(UpdateCollectStatusActions.updateCollectStatusUpdate({ data: updatedCollect }));
  
      // Écouter la mise à jour réussie et modifier la liste locale
      this.successMessage$.subscribe(success => {
        if (success === 'La Collection a bien été mise à jour') {
          this.collectRequests = this.collectRequests.map(c => 
            c.id === collect.id ? { ...c, status: updatedStatus } : c
          );
        }
      });
    }
  }
  

   photoUrl(user: User): string {
    return user.profileImage ? user.profileImage: 'assets/imgs/noImg.jpg';
  }
  constructor() {
    this.route.data.subscribe(data => {
      this.collectRequests = data['collectRequests'];;
    });
  }

  openPopup(collect: Collect): void {
    this.selectedCollect = collect;
    this.popupVisible = true;
  }

  closePopup(): void {
    this.popupVisible = false;
    this.selectedCollect = null;
  }



 getPhotos(collect: Collect | null): string[] {
    if (!collect) {
      return [];
    }
    if (collect.photos && collect.photos.length > 0) {
      return collect.photos.map((photo) =>  photo);
    }
    return [];
  }


  handleError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/imgs/noImg.jpg';
  }
 
}
