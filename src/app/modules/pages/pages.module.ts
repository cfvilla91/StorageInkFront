import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../theme/theme.module';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './configuration/users/users.component';
import { PartialsModule } from '../partials/partials.module';
import { UserDialogComponent } from './configuration/users/user-dialog.component';
import { UserDocumentsDialogComponent } from './configuration/users/user-documents-dialog.component';
import { UserDocumentAddDialogComponent } from './configuration/users/user-document-add-dialog.component';
import { UserDocumentPreviewDialogComponent } from './configuration/users/user-document-preview-dialog.component';
import { InksComponent } from './configuration/inks/inks.component';
import { SuppliesComponent } from './configuration/supplies/supplies.component';
import { InkDialogComponent } from './configuration/inks/ink-dialog.component';
import { SupplyDialogComponent } from './configuration/supplies/supply-dialog.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDialogComponent } from './clients/client-dialog.component';
import { ClientDocumentsDialogComponent } from './clients/client-documents-dialog.component';
import { ClientDocumentAddDialogComponent } from './clients/client-document-add-dialog.component';
import { ClientDocumentPreviewDialogComponent } from './clients/client-document-preview-dialog.component';
import { TattoosComponent } from './tattoos/tattoos.component';
import { TattooDialogComponent } from './tattoos/tattoo-dialog.component';
import { TattooImagesDialogComponent } from './tattoos/tattoo-images-dialog.component';
import { TattooImageAddDialogComponent } from './tattoos/tattoo-image-add-dialog.component';
import { TattooImagePreviewDialogComponent } from './tattoos/tattoo-image-preview-dialog.component';
import { TattooSessionsComponent } from './tattoos/tattoo-sessions/tattoo-sessions.component';
import { TattooSessionDialogComponent } from './tattoos/tattoo-sessions/tattoo-session-dialog.component';
import { DebounceClickDirective } from '../core/directives/debounce-click.directive';
import { ScheduleSessionComponent } from './schedule/schedule-session/schedule-session.component';
import { CalendarModule } from 'angular-calendar';
import { ScheduleSessionDialogComponent } from './schedule/schedule-session/schedule-session-dialog.component';
import { GeneralOverviewComponent } from './schedule/general-overview/general-overview.component';
import { MyScheduleComponent } from './schedule/my-schedule/my-schedule.component';
import { TattooSessionInksDialogComponent } from './tattoos/tattoo-sessions/tattoo-session-inks-dialog.component';
import { TattooSessionsReportComponent } from './reports/tattoo-sessions-report/tattoo-sessions-report.component';
import { TattooSessionInksReportDialogComponent } from './reports/tattoo-sessions-report/tattoo-session-inks-report-dialog.component';
import { UsersTattooSessionsReportComponent } from './reports/users-tattoo-sessions-report/users-tattoo-sessions-report.component';

const DIALOG_COMPONENTS = [
  UserDialogComponent,
  UserDocumentsDialogComponent,
  UserDocumentAddDialogComponent,
  UserDocumentPreviewDialogComponent,
  InkDialogComponent,
  SupplyDialogComponent,
  ClientDialogComponent,
  ClientDocumentsDialogComponent,
  ClientDocumentAddDialogComponent,
  ClientDocumentPreviewDialogComponent,
  TattooDialogComponent,
  TattooImageAddDialogComponent,
  TattooImagesDialogComponent,
  TattooImagePreviewDialogComponent,
  TattooSessionDialogComponent,
  ScheduleSessionDialogComponent,
  TattooSessionInksDialogComponent,
  TattooSessionInksReportDialogComponent,
];

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    UsersComponent,
    InksComponent,
    SuppliesComponent,
    ClientsComponent,
    TattoosComponent,
    ...DIALOG_COMPONENTS,
    TattooSessionsComponent,
    DebounceClickDirective,
    ScheduleSessionComponent,
    GeneralOverviewComponent,
    MyScheduleComponent,
    TattooSessionsReportComponent,
    UsersTattooSessionsReportComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    PartialsModule,
    CalendarModule
  ],
  entryComponents: [...DIALOG_COMPONENTS]
})
export class PagesModule { }
