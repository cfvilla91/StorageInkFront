import { Component, OnInit } from '@angular/core';
import { TattooSessionsService } from '../../../../shared/services/tattoo-sessions.service';
import { TattooSession } from 'src/app/shared/models/tattoo-session.model';
import { TableColumnDefinition } from '../../../partials/table/table.component';

@Component({
  selector: 'app-users-tattoo-sessions-report',
  templateUrl: './users-tattoo-sessions-report.component.html',
  styles: []
})
export class UsersTattooSessionsReportComponent implements OnInit {

  tattooSessionList;
  tattooSessionTableDisplayedColumns = [
    'first_name',
    'sessions',
  ];
  tattooSessionTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Operario',
      columnDefinition: 'first_name',
      cell: (row: any) => row.first_name + ' ' + row.last_name
    },
    {
      columnName: 'Cantidad de sesiones',
      columnDefinition: 'sessions',
      cell: (row: any) => row.cantidad_sesiones
    },
  ];

  constructor(
    private tattooSessionsService: TattooSessionsService
  ) { }

  ngOnInit() {
    this.tattooSessionsService.getTattooSessionsByUserReport()
      .subscribe(
        tattooSessions => {
          this.tattooSessionList = tattooSessions;
          console.log(this.tattooSessionList);
        }
      );
  }

}
