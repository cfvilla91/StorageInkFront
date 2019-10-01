import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { TableColumnDefinition } from '../../partials/table/table.component';
import { Profile } from '../../../shared/models/profile.model';

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
          label: 'botontest',
          action: (row: User) => console.log(row)
        }
      ]
    },
  ];
  userTableDisplayedColumns = ['FirstName', 'Email', 'Profile', 'actions'];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => this.userList = users);
  }

}
