import { Component, OnInit } from '@angular/core';
import { Tattoo } from '../../../shared/models/tattoo.model';
import { TableColumnDefinition } from '../../partials/table/table.component';
import { TattoosService } from '../../../shared/services/tattoos.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { TattooDialogComponent } from './tattoo-dialog.component';

@Component({
  selector: 'app-tattoos',
  templateUrl: './tattoos.component.html',
  styles: []
})
export class TattoosComponent implements OnInit {

  tattooList: Tattoo[];
  tattooTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Título tatuaje',
      columnDefinition: 'TattooTitle',
      cell: (row: Tattoo) => row.TattooTitle
    },
    {
      columnName: 'Estilo tatuaje',
      columnDefinition: 'TattooStyle',
      cell: (row: Tattoo) => row.TattooStyle
    },
    {
      columnName: 'Cliente',
      columnDefinition: 'Client',
      cell: (row: Tattoo) => row.Client.FirstName + ' ' + row.Client.LastName
    },
    {
      columnName: 'Estado',
      columnDefinition: 'TattooStatus',
      cell: (row: Tattoo) => row.TattooStatus
    },
  ];
  tattooTableDisplayedColumns = ['TattooTitle', 'TattooStyle', 'Client', 'TattooStatus'];

  constructor(
    private tattoosService: TattoosService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.tattoosService.getAll().subscribe(tattoos => this.tattooList = tattoos);
  }

  btnAddClicked() {
    const dialogRef = this.dialog.open(
      TattooDialogComponent,
      {
        width: '600px',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(
      newTattoo => {
        if (!isNullOrUndefined(newTattoo)) {
          this.snackBar.open('Tatuaje agregado correctamente.');
          this.tattooList = [
            ...this.tattooList,
            newTattoo
          ];
        }
      }
    );
  }

  tattoosTableRowClicked(row: Tattoo) {
    // TODO: VENTANA PULENTA DETALLE TATUAJE
  }

}
