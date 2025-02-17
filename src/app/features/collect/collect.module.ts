import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectRoutingModule } from './collect-routing.module';
import { CollectComponent } from './collect.component';
import { EffectsModule } from '@ngrx/effects';
import { CollectEffects } from '../../state/effects/collect/collect.effects';
import { CollectCardComponent } from './components/collect-card/collect-card.component';
import { CollectClientListComponent } from './components/collect-client-list/collect-client-list.component';
import { CollectCollectorListComponent } from './components/collect-collector-list/collect-collector-list.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { collectReducer } from '../../state/reducers/collect/collect.reducer';
import { SharedModule } from '../../shared/shared.module';
import { PointsEffects } from '../../state/effects/points/points.effects';
import { pointsReducer } from '../../state/reducers/points/points.reducer';


@NgModule({
  declarations: [
    CollectComponent,
    CollectCardComponent,
    CollectClientListComponent,
    CollectCollectorListComponent,
    RequestFormComponent
  ],
  imports: [
    CommonModule,
    CollectRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('collect', collectReducer),
    StoreModule.forFeature('points', pointsReducer),
    EffectsModule.forFeature([CollectEffects, PointsEffects]),
    SharedModule
  ]
})
export class CollectModule { }
