import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client.model';
import { TableColumnDefinition } from '../../partials/table/table.component';
import { ClientsService } from '../../../shared/services/clients.service';
import { ClientDocumentsService } from '../../../shared/services/client-documents.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { ClientDocumentsDialogComponent } from './client-documents-dialog.component';
import { ClientDialogComponent } from './client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: []
})
export class ClientsComponent implements OnInit {

  clientList: Client[];
  clientTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Nombre',
      columnDefinition: 'FirstName',
      cell: (row: Client) => row.FirstName + ' ' + row.LastName
    },
    {
      columnName: 'Correo',
      columnDefinition: 'Email',
      cell: (row: Client) => row.Email
    },
    {
      columnName: 'Rut',
      columnDefinition: 'Uid',
      cell: (row: Client) => row.Uid
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'actions',
      buttons: [
        {
          label: 'Documentos',
          action: (row: Client) => this.clientDocumentsDialog(row),
          color: 'primary'
        }
      ]
    },
  ];
  clientTableDisplayedColumns = ['FirstName', 'Email', 'Uid', 'actions'];

  constructor(
    private clientsService: ClientsService,
    private clientDocumentsService: ClientDocumentsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.clientsService.getAll().subscribe(clients => this.clientList = clients);
  }

  clientDocumentsDialog(client: Client) {
    if (isNullOrUndefined(client.ClientDocuments)) {
      this.clientDocumentsService.getClientDocumentsByClientId(client.Id).subscribe(
        clientDocuments => {
          client.ClientDocuments = clientDocuments;
        }
      );
    }

    this.dialog.open(
      ClientDocumentsDialogComponent,
      {
        width: '600px',
        data: { client }
      }
    );
  }

  btnAddClicked() {
    const dialogRef = this.dialog.open(
      ClientDialogComponent,
      {
        width: '600px',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(
      newClient => {
        if (!isNullOrUndefined(newClient)) {
          this.snackBar.open('Cliente agregado correctamente.');
          this.clientList = [
            ...this.clientList,
            newClient
          ];
        }
      }
    );
  }

  clientsTableRowClicked(row: Client) {
    const dialogRef = this.dialog.open(
      ClientDialogComponent,
      {
        width: '600px',
        data: { client: row }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (!isNullOrUndefined(result)) {
          if (typeof result === 'number') {
            this.snackBar.open('Cliente eliminado correctamente.');
            const index = this.clientList.indexOf(this.clientList.find(x => x.Id === result));
            this.clientList.splice(index, 1);
            this.clientList = [...this.clientList];
          } else {
            this.snackBar.open('Cliente actualizado correctamente.');
            const index = this.clientList.indexOf(this.clientList.find(x => x.Id === result.Id));
            this.clientList[index] = { ...result };
            this.clientList = [...this.clientList];
          }
        }
      }
    );
  }

}
