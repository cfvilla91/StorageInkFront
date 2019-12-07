import { Component, OnInit } from '@angular/core';
import { ScheduledSession } from '../../../../shared/models/scheduled-session.model';
import { User } from 'src/app/shared/models/user.model';
import { Client } from '../../../../shared/models/client.model';
import { UsersService } from '../../../../shared/services/users.service';
import { ClientsService } from '../../../../shared/services/clients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNull } from 'util';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-schedule-session-dialog',
  templateUrl: './schedule-session-dialog.component.html',
  styles: []
})
export class ScheduleSessionDialogComponent implements OnInit {

  scheduledSessionFormGroup: FormGroup;
  userList: User[];
  clientList: Client[];

  constructor(
    private usersService: UsersService,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<ScheduleSessionDialogComponent>,
  ) { }

  ngOnInit() {
    this.scheduledSessionFormGroup = new FormGroup(
      {
        Id: new FormControl(0),
        Notes: new FormControl(''),
        Client: new FormControl('', Validators.required),
        User: new FormControl('', Validators.required),
      }
    );
    this.usersService.getAll().subscribe(users => this.userList = users);
    this.clientsService.getAll().subscribe(clients => this.clientList = clients);
  }

  formSubmit() {
    this.dialogRef.close(this.scheduledSessionFormGroup.value);
    // if (isNull(this.scheduledSessionFormGroup.value.Id)) {
    //   this.inksService.addInk(this.scheduledSessionFormGroup.value).subscribe(
    //     newUser => {
    //       this.dialogRef.close(newUser);
    //     }
    //   );
    // } else {
    //   this.inksService.updateInk(this.scheduledSessionFormGroup.value).subscribe(
    //     updatedUser => {
    //       this.dialogRef.close(updatedUser);
    //     }
    //   );
    // }
  }

}
