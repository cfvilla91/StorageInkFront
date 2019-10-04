import { Component, OnInit, Inject } from '@angular/core';
import { Profile } from '../../../../shared/models/profile.model';
import { ProfilesService } from '../../../../shared/services/profiles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { isNull, isNullOrUndefined } from 'util';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../partials/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: []
})
export class UserDialogComponent implements OnInit {

  userFormGroup: FormGroup;
  selectedUser: User = null;

  profileList: Profile[];

  constructor(
    private profilesService: ProfilesService,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.profilesService.getAll().subscribe(profiles => this.profileList = profiles);
    this.userFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        FirstName: new FormControl('', Validators.required),
        LastName: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        Password: new FormControl(''),
        Profile: new FormControl('', Validators.required)
      }
    );
    if (!isNullOrUndefined(this.data)) {
      this.selectedUser = this.data.user;
      this.userFormGroup.reset(this.selectedUser);
    }
  }

  formSubmit() {
    if (isNull(this.userFormGroup.value.Id)) {
      this.usersService.addUser(this.userFormGroup.value).subscribe(
        newUser => {
          this.dialogRef.close(newUser);
        }
      );
    } else {
      this.usersService.updateUser(this.userFormGroup.value).subscribe(
        updatedUser => {
          this.dialogRef.close(updatedUser);
        }
      );
    }
  }

  restoreOnClick() {
    this.userFormGroup.reset(this.selectedUser);
  }

  clearOnClick() {
    this.userFormGroup.reset();
  }

  deleteOnClick() {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: 'auto',
        data: {
          message: '¿Desea eliminar el usuario?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.usersService.deleteUser(this.selectedUser.Id).subscribe(
            () => {
              this.dialogRef.close(this.selectedUser.Id);
            }
          );
        }
      }
    );
  }

}
