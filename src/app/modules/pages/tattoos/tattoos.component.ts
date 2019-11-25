import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Tattoo } from '../../../shared/models/tattoo.model';
import { TableColumnDefinition } from '../../partials/table/table.component';
import { TattoosService } from '../../../shared/services/tattoos.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { TattooDialogComponent } from './tattoo-dialog.component';
import { TattooImagesService } from '../../../shared/services/tattoo-images.service';
import { TattooImagesDialogComponent } from './tattoo-images-dialog.component';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

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
      columnName: 'Fecha creación',
      columnDefinition: 'CreatedAt',
      cell: (row: Tattoo) => formatDate(row.CreatedAt, 'dd-MM-yyyy HH:mm:ss', this.locale)
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'Actions',
      buttons: [
        {
          icon: 'photo_library',
          color: 'primary',
          action: (row: Tattoo) => this.tattooImagesDialog(row)
        },
        {
          label: 'Sesiones',
          color: 'primary',
          action: (row: Tattoo) => this.tattooSessions(row)
        },
      ]
    }
  ];
  tattooTableDisplayedColumns = ['TattooTitle', 'TattooStyle', 'Client', 'TattooStatus', 'CreatedAt', 'Actions'];

  constructor(
    private tattoosService: TattoosService,
    private tattooImagesService: TattooImagesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.tattoosService.getAll().subscribe(tattoos => {
      this.tattooList = [...tattoos];
      console.log(tattoos);
    });
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

  tattooSessions(tattoo: Tattoo) {
    this.router.navigate(['pages', 'tattooSessions', tattoo.Id]);
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
