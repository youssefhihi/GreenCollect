import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectComponent } from './collect.component';
import { collectionsResolver } from '../../core/resolvers/collections.resolver';
import { CollectClientListComponent } from './components/collect-client-list/collect-client-list.component';
import { RequestFormComponent } from './components/request-form/request-form.component';

const routes: Routes = [
   {  
      path: '', 
      component: CollectComponent, 
      children: [
        { path: 'list', component: CollectClientListComponent, resolve: { collectRequests: collectionsResolver } },
        { path: 'new', component: RequestFormComponent },
        { path: '', redirectTo: 'collect', pathMatch: 'full' }
      ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectRoutingModule { }
