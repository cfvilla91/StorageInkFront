import { Component, OnInit } from '@angular/core';
import { Supply } from '../../../../shared/models/supply.model';
import { TableColumnDefinition } from '../../../partials/table/table.component';
import { SuppliesService } from '../../../../shared/services/supplies.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SupplyDialogComponent } from './supply-dialog.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styles: []
})
export class SuppliesComponent implements OnInit {

  supplyList: Supply[];
  supplyTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Nombre Insumo',
      columnDefinition: 'SupplyName',
      cell: (row: Supply) => row.SupplyName
    },
  ];
  supplyTableDisplayedColumns = ['SupplyName'];

  constructor(
    private suppliesService: SuppliesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.suppliesService.getAll().subscribe(supplies => this.supplyList = supplies);
  }

  btnAddClicked() {
    const dialogRef = this.dialog.open(
      SupplyDialogComponent,
      {
        width: '800px',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(
      newSupply => {
        if (!isNullOrUndefined(newSupply)) {
          this.snackBar.open('Insumo agregado correctamente.');
          this.supplyList = [
            ...this.supplyList,
            newSupply
          ];
        }
      }
    );
  }

  supplysTableRowClicked(row: Supply) {
    const dialogRef = this.dialog.open(
      SupplyDialogComponent,
      {
        width: '800px',
        data: { supply: row }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (!isNullOrUndefined(result)) {
          if (typeof result === 'number') {
            this.snackBar.open('Insumo eliminado correctamente.');
            const index = this.supplyList.indexOf(this.supplyList.find(x => x.Id === result));
            this.supplyList.splice(index, 1);
            this.supplyList = [...this.supplyList];
          } else {
            this.snackBar.open('Insumo actualizado correctamente.');
            const index = this.supplyList.indexOf(this.supplyList.find(x => x.Id === result.Id));
            this.supplyList[index] = { ...result };
            this.supplyList = [...this.supplyList];
          }
        }
      }
    );
  }

}
