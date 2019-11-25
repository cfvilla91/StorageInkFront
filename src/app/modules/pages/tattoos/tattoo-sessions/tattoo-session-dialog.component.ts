import { Component, OnInit, Inject } from '@angular/core';
import { TattooSessionsService } from '../../../../shared/services/tattoo-sessions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../../../../shared/services/users.service';
import { User } from '../../../../shared/models/user.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tattoo } from '../../../../shared/models/tattoo.model';
import { isNullOrUndefined } from 'util';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-tattoo-session-dialog',
  templateUrl: './tattoo-session-dialog.component.html',
  styles: []
})
export class TattooSessionDialogComponent implements OnInit {

  userList: User[];
  selectedTattoo: Tattoo;
  tattooSessionFormGroup: FormGroup;
  filteredOptions$: Observable<User[]>;

  constructor(
    private tattooSessionsService: TattooSessionsService,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<TattooSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedTattoo = this.data.tattoo;
    }
    this.usersService.getAll().subscribe(users => {
      this.userList = [...users];
      this.filteredOptions$ = this.tattooSessionFormGroup.controls['User'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
    this.tattooSessionFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        Tattoo: new FormControl({ ...this.selectedTattoo }),
        User: new FormControl('', Validators.required),
        TattooSessionStatus: new FormControl(''),
        StartedAt: new FormControl(''),
        FinishedAt: new FormControl(''),
      }
    );
  }

  formSubmit() {
    this.tattooSessionsService.addTattooSession(this.tattooSessionFormGroup.value).subscribe(
      newTattooSession => this.dialogRef.close(newTattooSession)
    );
    // if (isNull(this.tattooSessionFormGroup.value.Id)) {
    //   this.tattooSessionsService.addTattooSession(this.tattooSessionFormGroup.value).subscribe(
    //     newTattooSession => {
    //       this.dialogRef.close(newTattooSession);
    //     }
    //   );
    // } else {
    //   this.tattooSessionsService.updateTattooSession(this.tattooSessionFormGroup.value).subscribe(
    //     updatedTattooSession => {
    //       this.dialogRef.close(updatedTattooSession);
    //     }
    //   );
    // }
  }

  private _filter(value: string): User[] {
    if (typeof value !== 'string') {
      return;
    }
    const filterValue = value.toLowerCase();

    return this.userList
      .filter(option => (option.FirstName + option.LastName).toLowerCase().includes(filterValue));
  }

  displayFn(user) {
    return user ? user.FirstName + ' ' + user.LastName : undefined;
  }


}
