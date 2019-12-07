import { Component, OnInit, Inject } from '@angular/core';
import { TattooSessionInksService } from '../../../../shared/services/tattoo-session-inks.service';
import { InksService } from 'src/app/shared/services/inks.service';
import { Ink } from '../../../../shared/models/ink.model';
import { TattooSessionInk } from '../../../../shared/models/tattoo-session-ink.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TattooSession } from '../../../../shared/models/tattoo-session.model';
import { TableColumnDefinition } from '../../../partials/table/table.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tattoo-session-inks-dialog',
  templateUrl: './tattoo-session-inks-dialog.component.html',
  styles: []
})
export class TattooSessionInksDialogComponent implements OnInit {

  inkList: Ink[];
  tattooSessionInkList: TattooSessionInk[];
  selectedTattooSession: TattooSession;

  tattooSessionTableDisplayedColumns = ['InkName', 'InkCode', 'InkProvider', 'Actions'];

  tattooSessionTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Nombre tinta',
      columnDefinition: 'InkName',
      cell: (row: Ink) => row.InkName
    },
    {
      columnName: 'Código tinta',
      columnDefinition: 'InkCode',
      cell: (row: Ink) => row.InkCode
    },
    {
      columnName: 'Fabricante',
      columnDefinition: 'InkProvider',
      cell: (row: Ink) => row.InkProvider.ProviderName
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'Actions',
      buttons: [
        {
          label: 'Agregar',
          color: 'primary',
          action: (row: Ink) => this.addInkToSelectedTattooSession(row),
          show: (row: Ink) =>
            this.tattooSessionInkList ? isNullOrUndefined(this.tattooSessionInkList.find(x => x.Ink.Id === row.Id)) : false
        },
        // {
        //   label: 'Finalizar',
        //   color: 'warn',
        //   action: (row: TattooSession) => this.endTattooSession(row),
        //   show: (row: TattooSession) => row.TattooSessionStatus === 'En Proceso'
        // },
      ]
    }
  ];

  constructor(
    private tattooSessionInksService: TattooSessionInksService,
    private inksService: InksService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TattooSessionInksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.inksService.getAll().subscribe(inks => this.inkList = inks);
    if (this.data) {
      this.selectedTattooSession = this.data.tattooSession;
      this.tattooSessionInksService.getTattooSessionInksByTattooSessionId(this.selectedTattooSession.Id)
        .subscribe(tattooSessionInks => this.tattooSessionInkList = tattooSessionInks);
    }
  }

  addInkToSelectedTattooSession(ink) {
    const newTattooSessionInk: TattooSessionInk = {
      Id: 0,
      Ink: ink,
      TattooSession: this.selectedTattooSession
    };
    this.tattooSessionInksService.addTattooSessionInk(newTattooSessionInk)
      .subscribe(
        tattooSessionInk => {
          this.tattooSessionInkList = [
            ...this.tattooSessionInkList,
            tattooSessionInk
          ];
          this.snackBar.open('Datos actualizados correctamente.');

        }
      );
  }

}
