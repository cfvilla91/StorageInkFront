import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponentLayoutComponent } from './base-component-layout/base-component-layout.component';
import { TableComponent } from './table/table.component';
import { ThemeModule } from '../theme/theme.module';
import { CardComponent } from './card/card.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoaderComponent } from './loader/loader.component';

const MODULE_COMPONENTS = [
  BaseComponentLayoutComponent,
  TableComponent,
  CardComponent,
  ConfirmationDialogComponent,
  LoaderComponent
];

@NgModule({
  declarations: [...MODULE_COMPONENTS],
  imports: [
    CommonModule,
    ThemeModule
  ],
  exports: [...MODULE_COMPONENTS],
  entryComponents: [ConfirmationDialogComponent]
})
export class PartialsModule { }
