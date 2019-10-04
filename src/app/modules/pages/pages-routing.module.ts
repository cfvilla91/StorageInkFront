import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './configuration/users/users.component';
import { SuppliesComponent } from './configuration/supplies/supplies.component';
import { InksComponent } from './configuration/inks/inks.component';
import { ClientsComponent } from './clients/clients.component';
import { TattoosComponent } from './tattoos/tattoos.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'tattoos',
        component: TattoosComponent
      },
      {
        path: 'configuration',
        children: [
          {
            path: 'users',
            component: UsersComponent,
          },
          {
            path: 'inks',
            component: InksComponent,
          },
          {
            path: 'supplies',
            component: SuppliesComponent,
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
