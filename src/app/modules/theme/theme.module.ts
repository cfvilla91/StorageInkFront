import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Material para Angular */
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule, MatListModule } from '@angular/material';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
// import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';




// import { CalendarModule } from 'angular-calendar';


/** Angular Forms */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';

/** Ng Flex Layout */
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { AppLayoutBaseComponent } from './layouts/app-layout-base/app-layout-base.component';
// import { LoaderComponent } from './loader/loader.component';
// import { CalendarComponent } from './components/calendar/calendar.component';
// import { CalendarDaySchedulerComponent } from './components/calendar-day-scheduler/calendar-day-scheduler.component';

const THEME_MODULES = [
  FormsModule,
  // FlexLayoutModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSidenavModule,
  MatRadioModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatDividerModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  NgMaterialMultilevelMenuModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatGridListModule,
  MatPaginatorModule,
  MatSortModule,
  MatRippleModule,
  // MaterialFileInputModule,
  MatExpansionModule,
  MatButtonToggleModule,
  // CalendarModule
];

const COMPONENTS = [
  BaseLayoutComponent
];

@NgModule({
  imports: [
    CommonModule,
    ...THEME_MODULES,
  ],
  exports: [
    ...THEME_MODULES,
    ...COMPONENTS,
  ],
  declarations: [...COMPONENTS],
})
export class ThemeModule { }
