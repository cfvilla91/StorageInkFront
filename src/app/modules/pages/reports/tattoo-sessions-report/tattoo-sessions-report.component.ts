import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { TattooSession } from '../../../../shared/models/tattoo-session.model';
import { TableColumnDefinition } from '../../../partials/table/table.component';
import { formatDate } from '@angular/common';
import { TattooSessionInksService } from '../../../../shared/services/tattoo-session-inks.service';
import { TattooSessionsService } from '../../../../shared/services/tattoo-sessions.service';
import { MatDialog } from '@angular/material';
import { TattooSessionInksReportDialogComponent } from './tattoo-session-inks-report-dialog.component';

@Component({
  selector: 'app-tattoo-sessions-report',
  templateUrl: './tattoo-sessions-report.component.html',
  styles: []
})
export class TattooSessionsReportComponent implements OnInit {


  tattooSessionList: TattooSession[] = [];
  tattooSessionTableDisplayedColumns = ['TattooName', 'TattooStyle', 'TattooSessionStatus', 'User', 'StartedAt', 'FinishedAt', 'Actions'];
  tattooSessionTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Tatuaje',
      columnDefinition: 'TattooName',
      cell: (row: TattooSession) => row.Tattoo.TattooTitle
    },
    {
      columnName: 'Estilo',
      columnDefinition: 'TattooStyle',
      cell: (row: TattooSession) => row.Tattoo.TattooStyle
    },
    {
      columnName: 'Encargado',
      columnDefinition: 'User',
      cell: (row: TattooSession) => row.User.FirstName + ' ' + row.User.LastName
    },
    {
      columnName: 'Estado sesión',
      columnDefinition: 'TattooSessionStatus',
      cell: (row: TattooSession) => row.TattooSessionStatus
    },
    {
      columnName: 'Comienzo',
      columnDefinition: 'StartedAt',
      cell: (row: TattooSession) => row.StartedAt ? formatDate(row.StartedAt, 'dd-MM-yyyy HH:mm:ss', this.locale) : ''
    },
    {
      columnName: 'Fin',
      columnDefinition: 'FinishedAt',
      cell: (row: TattooSession) => row.FinishedAt ? formatDate(row.FinishedAt, 'dd-MM-yyyy HH:mm:ss', this.locale) : ''
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'Actions',
      buttons: [
        {
          label: 'Ver Tintas',
          color: 'primary',
          action: (row: TattooSession) => this.tattooSessionInksDialog(row),
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
    private tattooSessionsService: TattooSessionsService,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.tattooSessionsService.getAll()
      .subscribe(tattooSessionInks => this.tattooSessionList = tattooSessionInks);
  }

  tattooSessionInksDialog(tattooSession) {
    this.tattooSessionInksService.getTattooSessionInksByTattooSessionId(tattooSession.Id)
      .subscribe(
        tattooSessionInks => {
          this.dialog.open(
            TattooSessionInksReportDialogComponent,
            {
              width: '800px',
              data: { tattooSessionInks }
            }
          );
        }
      );
  }

}
