import { Component, OnInit } from '@angular/core';
import { Tattoo } from '../../../shared/models/tattoo.model';
import { TableColumnDefinition } from '../../partials/table/table.component';
import { TattoosService } from '../../../shared/services/tattoos.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { TattooDialogComponent } from './tattoo-dialog.component';
import { TattooImagesService } from '../../../shared/services/tattoo-images.service';
import { TattooImagesDialogComponent } from './tattoo-images-dialog.component';

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
    {
      columnName: 'Acciones',
      columnDefinition: 'Actions',
      buttons: [
        {
          label: 'Ver imágenes',
          color: 'primary',
          action: (row: Tattoo) => this.tattooImagesDialog(row)
        }
      ]
    }
  ];
  tattooTableDisplayedColumns = ['TattooTitle', 'TattooStyle', 'Client', 'TattooStatus', 'Actions'];

  constructor(
    private tattoosService: TattoosService,
    private tattooImagesService: TattooImagesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.tattoosService.getAll().subscribe(tattoos => this.tattooList = tattoos);
  }

  tattooImagesDialog(tattoo: Tattoo) {
    if (isNullOrUndefined(tattoo.TattooImages)) {
      this.tattooImagesService.getTattooImagesByTattooId(tattoo.Id).subscribe(
        tattooImages => {
          tattoo.TattooImages = [...tattooImages];
        }
      );
    }

    this.dialog.open(
      TattooImagesDialogComponent,
      {
        width: '800px',
        data: { tattoo }
      }
    );
  }

  btnAddClicked() {
    const dialogRef = this.dialog.open(
      TattooDialogComponent,
      {
        width: '800px',
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
