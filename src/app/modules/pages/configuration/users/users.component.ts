import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { TableColumnDefinition } from '../../../partials/table/table.component';
import { UserDialogComponent } from './user-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { UserDocumentsService } from '../../../../shared/services/user-documents.service';
import { UserDocumentsDialogComponent } from './user-documents-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  userList: User[];
  userTableColumnDefinitions: TableColumnDefinition[] = [
    {
      columnName: 'Nombre',
      columnDefinition: 'FirstName',
      cell: (row: User) => row.FirstName + ' ' + row.LastName
    },
    {
      columnName: 'Correo',
      columnDefinition: 'Email',
      cell: (row: User) => row.Email
    },
    {
      columnName: 'Perfil',
      columnDefinition: 'Profile',
      cell: (row: User) => row.Profile.ProfileName
    },
    {
      columnName: 'Acciones',
      columnDefinition: 'actions',
      buttons: [
        {
          label: 'Documentos',
          action: (row: User) => this.userDocumentsDialog(row),
          color: 'primary'
        }
      ]
    },
  ];
  userTableDisplayedColumns = ['FirstName', 'Email', 'Profile', 'actions'];

  constructor(
    private usersService: UsersService,
    private userDocumentsService: UserDocumentsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => this.userList = users);
  }

  userDocumentsDialog(user: User) {
    if (isNullOrUndefined(user.UserDocuments)) {
      this.userDocumentsService.getUserDocumentsByUserId(user.Id).subscribe(
        userDocuments => {
          user.UserDocuments = userDocuments;
        }
      );
    }

    this.dialog.open(
      UserDocumentsDialogComponent,
      {
        width: '800px',
        data: { user }
      }
    );
  }

  btnAddClicked() {
    const dialogRef = this.dialog.open(
      UserDialogComponent,
      {
        width: '800px',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(
      newUser => {
        if (!isNullOrUndefined(newUser)) {
          this.snackBar.open('Usuario agregado correctamente.');
          this.userList = [
            ...this.userList,
            newUser
          ];
        }
      }
    );
  }

  usersTableRowClicked(row: User) {
    const dialogRef = this.dialog.open(
      UserDialogComponent,
      {
        width: '800px',
        data: { user: row }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (!isNullOrUndefined(result)) {
          if (typeof result === 'number') {
            this.snackBar.open('Usuario eliminado correctamente.');
            const index = this.userList.indexOf(this.userList.find(x => x.Id === result));
            this.userList.splice(index, 1);
            this.userList = [...this.userList];
          } else {
            this.snackBar.open('Usuario actualizado correctamente.');
            const index = this.userList.indexOf(this.userList.find(x => x.Id === result.Id));
            this.userList[index] = { ...result };
            this.userList = [...this.userList];
          }
        }
      }
    );
  }

}
