import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './configuration/users/users.component';
import { SuppliesComponent } from './configuration/supplies/supplies.component';
import { InksComponent } from './configuration/inks/inks.component';
import { ClientsComponent } from './clients/clients.component';
import { TattoosComponent } from './tattoos/tattoos.component';
import { TattooSessionsComponent } from './tattoos/tattoo-sessions/tattoo-sessions.component';
import { ScheduleSessionComponent } from './schedule/schedule-session/schedule-session.component';
import { GeneralOverviewComponent } from './schedule/general-overview/general-overview.component';
import { MyScheduleComponent } from './schedule/my-schedule/my-schedule.component';
import { TattooSessionsReportComponent } from './reports/tattoo-sessions-report/tattoo-sessions-report.component';
import { UsersTattooSessionsReportComponent } from './reports/users-tattoo-sessions-report/users-tattoo-sessions-report.component';

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
        path: 'tattooSessions/:id',
        component: TattooSessionsComponent
      },
      {
        path: 'schedule/scheduleSession',
        component: ScheduleSessionComponent
      },
      {
        path: 'schedule/overview',
        component: GeneralOverviewComponent
      },
      {
        path: 'schedule/mySchedule',
        component: MyScheduleComponent
      },
      {
        path: 'reports',
        children: [
          {
            path: 'tattooSessions',
            component: TattooSessionsReportComponent
          },
          {
            path: 'userTattooSessions',
            component: UsersTattooSessionsReportComponent
          }
        ]
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
