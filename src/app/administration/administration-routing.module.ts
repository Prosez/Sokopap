import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AdministrationComponent } from './administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
        { path: 'signin', component:SigninComponent},
      { path: 'home', component: HomeComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'sidebar', component: SidebarComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
