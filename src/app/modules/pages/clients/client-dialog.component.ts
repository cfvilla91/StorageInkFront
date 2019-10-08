import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../../../shared/models/client.model';
import { ClientsService } from '../../../shared/services/clients.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined, isNull } from 'util';
import { ConfirmationDialogComponent } from '../../partials/confirmation-dialog/confirmation-dialog.component';
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styles: []
})
export class ClientDialogComponent implements OnInit {

  clientFormGroup: FormGroup;
  selectedClient: Client = null;


  constructor(
    private clientsService: ClientsService,
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    public dialog: MatDialog,
    public rutValidator: RutValidator,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.clientFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        FirstName: new FormControl('', Validators.required),
        LastName: new FormControl('', Validators.required),
        Uid: new FormControl('', [Validators.required]),
        Email: new FormControl('', Validators.required),
      }
    );
    if (!isNullOrUndefined(this.data)) {
      this.selectedClient = this.data.client;
      this.clientFormGroup.reset(this.selectedClient);
    }
  }

  formSubmit() {
    if (isNull(this.clientFormGroup.value.Id)) {
      this.clientsService.addClient(this.clientFormGroup.value).subscribe(
        newClient => {
          this.dialogRef.close(newClient);
        }
      );
    } else {
      this.clientsService.updateClient(this.clientFormGroup.value).subscribe(
        updatedClient => {
          this.dialogRef.close(updatedClient);
        }
      );
    }
  }

  restoreOnClick() {
    this.clientFormGroup.reset(this.selectedClient);
  }

  clearOnClick() {
    this.clientFormGroup.reset();
  }

  deleteOnClick() {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: 'auto',
        data: {
          message: '¿Desea eliminar el cliente?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.clientsService.deleteClient(this.selectedClient.Id).subscribe(
            () => {
              this.dialogRef.close(this.selectedClient.Id);
            }
          );
        }
      }
    );
  }

}
