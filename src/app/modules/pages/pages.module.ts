import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../theme/theme.module';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  declarations: [PagesComponent, HomeComponent, UsersComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    PartialsModule
  ]
})
export class PagesModule { }
