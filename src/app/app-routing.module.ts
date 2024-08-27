import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { AdministrationRoutingModule } from './administration/administration-routing.module'; 

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: AdministrationComponent, loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: 'sellers', loadChildren: () => import('./sellers/sellers.module').then(m => m.SellersModule) },
  { path: 'transport', loadChildren: () => import('./transport/transport.module').then(m => m.TransportModule) },
  { path: 'buyers', loadChildren: () => import('./buyers/buyers.module').then(m => m.BuyersModule) },
  { path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdministrationRoutingModule],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
