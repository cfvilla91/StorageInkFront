import { Component, OnInit, Inject } from '@angular/core';
import { Client } from '../../../shared/models/client.model';
import { TableColumnDefinition } from '../../partials/table/table.component';
import { ClientDocument } from '../../../shared/models/client-document.model';
import { ClientDocumentsService } from '../../../shared/services/client-documents.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { ClientDocumentAddDialogComponent } from './client-document-add-dialog.component';
import { ClientDocumentPreviewDialogComponent } from './client-document-preview-dialog.component';
import { ConfirmationDialogComponent } from '../../partials/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-client-documents-dialog',
  templateUrl: './client-documents-dialog.component.html',
  styles: []
})
export class ClientDocumentsDialogComponent implements OnInit {

  selectedClient: Client = null;
  clientDocumentsTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Tipo de archivo',
      columnDefinition: 'Extension',
      cell: (row: ClientDocument) => row.Extension
    },
    {
      columnName: 'Descripción',
      columnDefinition: 'Description',
      cell: (row: ClientDocument) => row.Description
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'Actions',
      buttons: [
        {
          label: 'Eliminar',
          action: (row: ClientDocument) => this.deleteClientDocumentBtnClicked(row),
          color: 'warn'
        }
      ]
    },
  ];

  clientDocumentsTableDisplayedColumns = ['Extension', 'Description', 'Actions'];

  constructor(
    private clientDocumentsService: ClientDocumentsService,
    public dialogRef: MatDialogRef<ClientDocumentsDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedClient = this.data.client;
    }
  }

  addClientDocumentBtnClicked() {
    const dialogRef = this.dialog.open(
      ClientDocumentAddDialogComponent,
      {
        width: '600px',
        data: { client: this.selectedClient }
      }
    );

    dialogRef.afterClosed().subscribe(
      newClientDocument => {
        if (!isNullOrUndefined(newClientDocument)) {
          this.snackBar.open('Documento agregado correctamente.');
          this.selectedClient.ClientDocuments = [
            ...this.selectedClient.ClientDocuments,
            newClientDocument
          ];
        }
      }
    );
  }

  clientDocumentsTableRowClicked(clientDocument) {
    this.dialog.open(
      ClientDocumentPreviewDialogComponent,
      {
        width: '600px',
        data: { clientDocument }
      }
    );
  }

  deleteClientDocumentBtnClicked(clientDocument: ClientDocument) {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: 'auto',
        data: {
          message: '¿Desea eliminar el documento ' + clientDocument.Description + '?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.clientDocumentsService.deleteClientDocument(clientDocument.Id).subscribe(
            () => {
              this.snackBar.open('Documento eliminado correctamente.');
              const index = this.selectedClient.ClientDocuments
                .indexOf(this.selectedClient.ClientDocuments.find(x => x.Id === clientDocument.Id));
              this.selectedClient.ClientDocuments.splice(index, 1);
              this.selectedClient.ClientDocuments = [...this.selectedClient.ClientDocuments];
            }
          );
        }
      }
    );
  }

}
