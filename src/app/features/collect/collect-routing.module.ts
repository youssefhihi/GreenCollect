import { userCollectionsResolver } from './../../core/resolvers/user-collections.resolver';
import { isAuthGuard } from './../../core/guards/is-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectComponent } from './collect.component';
import { collectionsResolver } from '../../core/resolvers/collections.resolver';
import { CollectClientListComponent } from './components/collect-client-list/collect-client-list.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { isClientGuard } from '../../core/guards/is-client.guard';
import { isCollectorGuardGuard } from '../../core/guards/is-collector-guard.guard';
import { CollectCollectorListComponent } from './components/collect-collector-list/collect-collector-list.component';

const routes: Routes = [
   {  
      path: '', 
      component: CollectComponent, 
      canActivate:[isClientGuard],
      children: [
        { path: 'list', component: CollectClientListComponent, resolve: { collectRequests: userCollectionsResolver } },
        { path: 'new', component: RequestFormComponent },
        { path: '', redirectTo: 'collect/list', pathMatch: 'full' }
      ],
    },
    {  
      path: 'requests', 
      component: CollectComponent, 
      canActivate:[isCollectorGuardGuard],
      children: [
        { path: 'list', component: CollectCollectorListComponent, resolve: { collectRequests: collectionsResolver } },
        { path: '', redirectTo: 'collect/requests/list', pathMatch: 'full' }
      ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectRoutingModule { }
