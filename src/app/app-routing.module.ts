import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { AdministrationRoutingModule } from './administration/administration-routing.module'; 

const routes: Routes = [
  { path: 'admin', component: AdministrationComponent, loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdministrationRoutingModule],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
