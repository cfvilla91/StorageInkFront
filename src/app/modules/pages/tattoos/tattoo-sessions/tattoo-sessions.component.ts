import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TattooSessionsService } from '../../../../shared/services/tattoo-sessions.service';
import { Tattoo } from '../../../../shared/models/tattoo.model';
import { TattooSession } from '../../../../shared/models/tattoo-session.model';
import { TattoosService } from '../../../../shared/services/tattoos.service';
import { TableColumnDefinition } from '../../../partials/table/table.component';
import { MatDialog } from '@angular/material';
import { TattooSessionDialogComponent } from './tattoo-session-dialog.component';
import { formatDate } from '@angular/common';
import { TattooSessionInksDialogComponent } from './tattoo-session-inks-dialog.component';

@Component({
  selector: 'app-tattoo-sessions',
  templateUrl: './tattoo-sessions.component.html',
  styles: []
})
export class TattooSessionsComponent implements OnInit {

  selectedTatto: Tattoo;
  tattooSessionList: TattooSession[];
  tattooSessionTableDisplayedColumns = ['TattooSessionStatus', 'User', 'StartedAt', 'FinishedAt', 'Actions'];
  tattooSessionTableColumnDefinitions: TableColumnDefinition[] = [
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
          label: 'Comenzar',
          color: 'primary',
          action: (row: TattooSession) => this.startTattooSession(row),
          show: (row: TattooSession) => row.TattooSessionStatus === 'Creada'
        },
        {
          label: 'Finalizar',
          color: 'warn',
          action: (row: TattooSession) => this.endTattooSession(row),
          show: (row: TattooSession) => row.TattooSessionStatus === 'En Proceso'
        },
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private tattoosService: TattoosService,
    private tattooSessionsService: TattooSessionsService,
    public dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(
        params => {
          const tattooId = params.get('id');
          this.tattooSessionsService.getTattooSessionsByTattooId(tattooId)
            .subscribe(tattooSessions => this.tattooSessionList = [...tattooSessions]);
          this.tattoosService.getTattooById(tattooId).subscribe(tattoo => this.selectedTatto = { ...tattoo });
        }
      );
  }

  startTattooSession(tattooSession: TattooSession) {
    this.tattooSessionsService.startTattooSession(tattooSession.Id).subscribe(
      startedTattooSession => {
        console.log(startedTattooSession);
        const index = this.tattooSessionList.indexOf(this.tattooSessionList.find(x => x.Id === startedTattooSession.Id));
        this.tattooSessionList[index] = startedTattooSession;
        this.tattooSessionList = [...this.tattooSessionList];
      }
    );
  }

  endTattooSession(tattooSession: TattooSession) {
    this.tattooSessionsService.endTattooSession(tattooSession.Id).subscribe(
      finishedTattooSession => {
        const index = this.tattooSessionList.indexOf(this.tattooSessionList.find(x => x.Id === finishedTattooSession.Id));
        this.tattooSessionList[index] = finishedTattooSession;
        this.tattooSessionList = [...this.tattooSessionList];
      }
    );
  }

  btnAddClicked() {
    const dialogRef = this.dialog.open(
      TattooSessionDialogComponent,
      {
        width: '800px',
        data: { tattoo: this.selectedTatto }
      }
    );

    dialogRef.afterClosed().subscribe(
      newTattooSession => {
        this.tattooSessionList = [
          ...this.tattooSessionList,
          newTattooSession
        ];
      }
    );
  }

  tattooSessionsTableRowClicked(tattooSession) {
    console.log(tattooSession);
    this.dialog.open(
      TattooSessionInksDialogComponent,
      {
        width: '800px',
        data: { tattooSession }
      }
    );
  }

}
