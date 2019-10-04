import { Component, OnInit, Inject } from '@angular/core';
import { Tattoo } from '../../../shared/models/tattoo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TattoosService } from '../../../shared/services/tattoos.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined, isNull } from 'util';
import { ConfirmationDialogComponent } from '../../partials/confirmation-dialog/confirmation-dialog.component';
import { ClientsService } from '../../../shared/services/clients.service';
import { Client } from '../../../shared/models/client.model';
import { Observable, pipe } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-tattoo-dialog',
  templateUrl: './tattoo-dialog.component.html',
  styles: []
})
export class TattooDialogComponent implements OnInit {

  tattooFormGroup: FormGroup;
  selectedTattoo: Tattoo;
  clientList: Client[];

  filteredOptions$: Observable<Client[]>;

  constructor(
    private tattoosService: TattoosService,
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<TattooDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.clientsService.getAll().subscribe(clients => {
      this.clientList = clients;
      this.filteredOptions$ = this.tattooFormGroup.controls['Client'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      console.log(clients);
    });
    this.tattooFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        TattooTitle: new FormControl('', Validators.required),
        TattooStyle: new FormControl('', Validators.required),
        CoverUp: new FormControl(false),
        Client: new FormControl(null, Validators.required),
        TattooStatus: new FormControl(''),
      }
    );
    if (!isNullOrUndefined(this.data)) {
      this.selectedTattoo = this.data.tattoo;
      this.tattooFormGroup.reset(this.selectedTattoo);
    }
  }

  formSubmit() {
    if (isNull(this.tattooFormGroup.value.Id)) {
      this.tattoosService.addTattoo(this.tattooFormGroup.value).subscribe(
        newUser => {
          this.dialogRef.close(newUser);
        }
      );
    } else {
      this.tattoosService.updateTattoo(this.tattooFormGroup.value).subscribe(
        updatedUser => {
          this.dialogRef.close(updatedUser);
        }
      );
    }
  }

  restoreOnClick() {
    this.tattooFormGroup.reset(this.selectedTattoo);
  }

  clearOnClick() {
    this.tattooFormGroup.reset();
  }

  deleteOnClick() {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: 'auto',
        data: {
          message: '¿Desea eliminar el insumo?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.tattoosService.deleteTattoo(this.selectedTattoo.Id).subscribe(
            () => {
              this.dialogRef.close(this.selectedTattoo.Id);
            }
          );
        }
      }
    );
  }

  private _filter(value: string): Client[] {
    if (typeof value !== 'string') {
      return;
    }
    const filterValue = value.toLowerCase();

    return this.clientList
      .filter(option => (option.FirstName + option.LastName + option.Uid + option.Email).toLowerCase().includes(filterValue));
  }

  displayFn(client) {
    return client ? client.FirstName + ' ' + client.LastName : undefined;
  }

}
