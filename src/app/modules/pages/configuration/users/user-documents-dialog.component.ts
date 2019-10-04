import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { TableColumnDefinition } from '../../../partials/table/table.component';
import { UserDocument } from '../../../../shared/models/user-document.model';
import { UserDocumentAddDialogComponent } from './user-document-add-dialog.component';
import { UserDocumentPreviewDialogComponent } from './user-document-preview-dialog.component';
import { ConfirmationDialogComponent } from '../../../partials/confirmation-dialog/confirmation-dialog.component';
import { UserDocumentsService } from '../../../../shared/services/user-documents.service';

@Component({
  selector: 'app-user-documents-dialog',
  templateUrl: './user-documents-dialog.component.html',
  styles: []
})
export class UserDocumentsDialogComponent implements OnInit {

  selectedUser: User = null;
  userDocumentsTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Tipo de archivo',
      columnDefinition: 'Extension',
      cell: (row: UserDocument) => row.Extension
    },
    {
      columnName: 'Descripción',
      columnDefinition: 'Description',
      cell: (row: UserDocument) => row.Description
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'Actions',
      buttons: [
        {
          label: 'Eliminar',
          action: (row: UserDocument) => this.deleteUserDocumentBtnClicked(row),
          color: 'warn'
        }
      ]
    },
  ];

  userDocumentsTableDisplayedColumns = ['Extension', 'Description', 'Actions'];

  constructor(
    private userDocumentsService: UserDocumentsService,
    public dialogRef: MatDialogRef<UserDocumentsDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedUser = this.data.user;
    }
  }

  addUserDocumentBtnClicked() {
    const dialogRef = this.dialog.open(
      UserDocumentAddDialogComponent,
      {
        width: '600px',
        data: { user: this.selectedUser }
      }
    );

    dialogRef.afterClosed().subscribe(
      newUserDocument => {
        if (!isNullOrUndefined(newUserDocument)) {
          this.snackBar.open('Documento agregado correctamente.');
          this.selectedUser.UserDocuments = [
            ...this.selectedUser.UserDocuments,
            newUserDocument
          ];
        }
      }
    );
  }

  userDocumentsTableRowClicked(userDocument) {
    this.dialog.open(
      UserDocumentPreviewDialogComponent,
      {
        width: '600px',
        data: { userDocument }
      }
    );
  }

  deleteUserDocumentBtnClicked(userDocument: UserDocument) {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: 'auto',
        data: {
          message: '¿Desea eliminar el documento ' + userDocument.Description + '?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.userDocumentsService.deleteUserDocument(userDocument.Id).subscribe(
            () => {
              this.snackBar.open('Documento eliminado correctamente.');
              const index = this.selectedUser.UserDocuments.indexOf(this.selectedUser.UserDocuments.find(x => x.Id === userDocument.Id));
              this.selectedUser.UserDocuments.splice(index, 1);
              this.selectedUser.UserDocuments = [...this.selectedUser.UserDocuments];
            }
          );
        }
      }
    );
  }

}
