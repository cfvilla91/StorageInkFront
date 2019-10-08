import { Component, OnInit, Inject } from '@angular/core';
import { Tattoo } from '../../../shared/models/tattoo.model';
import { TableColumnDefinition } from '../../partials/table/table.component';
import { TattooImagesService } from '../../../shared/services/tattoo-images.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { TattooImage } from '../../../shared/models/tattoo-image.model';
import { TattooImageAddDialogComponent } from './tattoo-image-add-dialog.component';
import { TattooImagePreviewDialogComponent } from './tattoo-image-preview-dialog.component';

@Component({
  selector: 'app-tattoo-images-dialog',
  templateUrl: './tattoo-images-dialog.component.html',
  styles: []
})
export class TattooImagesDialogComponent implements OnInit {

  selectedTattoo: Tattoo = null;
  tattooImagesTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Tipo de archivo',
      columnDefinition: 'Extension',
      cell: (row: TattooImage) => row.Extension
    },
    {
      columnName: 'Descripción',
      columnDefinition: 'Description',
      cell: (row: TattooImage) => row.Description
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'Actions',
      buttons: [
        {
          label: 'Eliminar',
          color: 'warn',
          action: (row: TattooImage) => { }
        }
      ]
    },
  ];
  tattooImagesTableDisplayedColumns = ['Extension', 'Description'];

  constructor(
    private tattooImagesService: TattooImagesService,
    public dialogRef: MatDialogRef<TattooImagesDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedTattoo = this.data.tattoo;
    }
  }

  tattooImagesTableRowClicked(tattooImage: TattooImage) {
    this.dialog.open(
      TattooImagePreviewDialogComponent,
      {
        width: '800px',
        data: { tattooImage }
      }
    );
  }

  addTattooImageBtnClicked() {
    const dialogRef = this.dialog.open(
      TattooImageAddDialogComponent,
      {
        width: '800px',
        data: { tattoo: this.selectedTattoo }
      }
    );

    dialogRef.afterClosed().subscribe(
      newTattooImage => {
        if (!isNullOrUndefined(newTattooImage)) {
          this.snackBar.open('Imagen agregada correctamente.');
          this.selectedTattoo.TattooImages = [
            ...this.selectedTattoo.TattooImages,
            newTattooImage
          ];
        }
      }
    );
  }

}
