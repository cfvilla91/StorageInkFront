import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Supply } from '../../../../shared/models/supply.model';
import { SuppliesService } from '../../../../shared/services/supplies.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined, isNull } from 'util';
import { ConfirmationDialogComponent } from '../../../partials/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-supply-dialog',
  templateUrl: './supply-dialog.component.html',
  styles: []
})
export class SupplyDialogComponent implements OnInit {

  supplyFormGroup: FormGroup;
  selectedSupply: Supply;

  constructor(
    private suppliesService: SuppliesService,
    public dialogRef: MatDialogRef<SupplyDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.supplyFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        SupplyName: new FormControl('', Validators.required),
      }
    );
    if (!isNullOrUndefined(this.data)) {
      this.selectedSupply = this.data.supply;
      this.supplyFormGroup.reset(this.selectedSupply);
    }
  }

  formSubmit() {
    if (isNull(this.supplyFormGroup.value.Id)) {
      this.suppliesService.addSupply(this.supplyFormGroup.value).subscribe(
        newUser => {
          this.dialogRef.close(newUser);
        }
      );
    } else {
      this.suppliesService.updateSupply(this.supplyFormGroup.value).subscribe(
        updatedUser => {
          this.dialogRef.close(updatedUser);
        }
      );
    }
  }

  restoreOnClick() {
    this.supplyFormGroup.reset(this.selectedSupply);
  }

  clearOnClick() {
    this.supplyFormGroup.reset();
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
          this.suppliesService.deleteSupply(this.selectedSupply.Id).subscribe(
            () => {
              this.dialogRef.close(this.selectedSupply.Id);
            }
          );
        }
      }
    );
  }

}
