import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponentLayoutComponent } from './base-component-layout/base-component-layout.component';
import { TableComponent } from './table/table.component';
import { ThemeModule } from '../theme/theme.module';
import { CardComponent } from './card/card.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { CameraComponent } from './camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { DatePipe } from '@angular/common';

const MODULE_COMPONENTS = [
  BaseComponentLayoutComponent,
  TableComponent,
  CardComponent,
  ConfirmationDialogComponent,
  LoaderComponent,
  CameraComponent,
  DayViewSchedulerComponent,
  CalendarComponent
];

@NgModule({
  declarations: [...MODULE_COMPONENTS],
  imports: [
    CommonModule,
    ThemeModule,
    WebcamModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  exports: [...MODULE_COMPONENTS],
  entryComponents: [ConfirmationDialogComponent, CameraComponent],
  providers: [DatePipe]
})
export class PartialsModule { }
