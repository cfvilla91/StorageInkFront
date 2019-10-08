import { Component, OnInit } from '@angular/core';
import { Ink } from 'src/app/shared/models/ink.model';
import { TableColumnDefinition } from '../../../partials/table/table.component';
import { InksService } from 'src/app/shared/services/inks.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InkDialogComponent } from './ink-dialog.component';
import { isNullOrUndefined } from 'util';
import { InkProvider } from '../../../../shared/models/ink-provider.model';

@Component({
  selector: 'app-inks',
  templateUrl: './inks.component.html',
})
export class InksComponent implements OnInit {

  inkList: Ink[];
  inkTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Nombre Tinta',
      columnDefinition: 'InkName',
      cell: (row: Ink) => row.InkName
    },
    {
      columnName: 'Fabricante',
      columnDefinition: 'InkProvider',
      cell: (row: Ink) => row.InkProvider.ProviderName
    }
  ];
  inkTableDisplayedColumns = ['InkName', 'InkProvider'];

  constructor(
    private inksService: InksService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.inksService.getAll().subscribe(inks => this.inkList = inks);
  }

  btnAddClicked() {
    const dialogRef = this.dialog.open(
      InkDialogComponent,
      {
        width: '800px',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(
      newInk => {
        if (!isNullOrUndefined(newInk)) {
          this.snackBar.open('Tinta agregado correctamente.');
          this.inkList = [
            ...this.inkList,
            newInk
          ];
        }
      }
    );
  }

  inksTableRowClicked(row: Ink) {
    const dialogRef = this.dialog.open(
      InkDialogComponent,
      {
        width: '800px',
        data: { ink: row }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (!isNullOrUndefined(result)) {
          if (typeof result === 'number') {
            this.snackBar.open('Tinta eliminado correctamente.');
            const index = this.inkList.indexOf(this.inkList.find(x => x.Id === result));
            this.inkList.splice(index, 1);
            this.inkList = [...this.inkList];
          } else {
            this.snackBar.open('Tinta actualizado correctamente.');
            const index = this.inkList.indexOf(this.inkList.find(x => x.Id === result.Id));
            this.inkList[index] = { ...result };
            this.inkList = [...this.inkList];
          }
        }
      }
    );
  }

}
