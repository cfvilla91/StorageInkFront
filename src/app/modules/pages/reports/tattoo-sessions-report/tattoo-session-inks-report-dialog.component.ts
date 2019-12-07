import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TattooSessionInk } from '../../../../shared/models/tattoo-session-ink.model';
import { TableColumnDefinition } from '../../../partials/table/table.component';

@Component({
  selector: 'app-tattoo-session-inks-report-dialog',
  templateUrl: './tattoo-session-inks-report-dialog.component.html',
  styles: []
})
export class TattooSessionInksReportDialogComponent implements OnInit {

  tattooSessionInkList: TattooSessionInk[];

  tattooSessionTableDisplayedColumns = [
    'InkName',
    'InkCode',
    'InkProviderName',
  ];
  tattooSessionTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Tatuaje',
      columnDefinition: 'InkName',
      cell: (row: TattooSessionInk) => row.Ink.InkName
    },
    {
      columnName: 'Tatuaje',
      columnDefinition: 'InkCode',
      cell: (row: TattooSessionInk) => row.Ink.InkCode
    },
    {
      columnName: 'Tatuaje',
      columnDefinition: 'InkProviderName',
      cell: (row: TattooSessionInk) => row.Ink.InkProvider.ProviderName
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<TattooSessionInksReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data) {
      this.tattooSessionInkList = this.data.tattooSessionInks;
    }
  }

}
