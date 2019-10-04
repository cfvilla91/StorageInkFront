import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ink } from '../../../../shared/models/ink.model';
import { InksService } from 'src/app/shared/services/inks.service';
import { InkProvidersService } from 'src/app/shared/services/ink-providers.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined, isNull } from 'util';
import { ConfirmationDialogComponent } from '../../../partials/confirmation-dialog/confirmation-dialog.component';
import { InkProvider } from 'src/app/shared/models/ink-provider.model';

@Component({
  selector: 'app-ink-dialog',
  templateUrl: './ink-dialog.component.html',
  styles: []
})
export class InkDialogComponent implements OnInit {

  inkFormGroup: FormGroup;
  selectedInk: Ink;

  inkProviderList: InkProvider[];

  constructor(
    private inkProvidersService: InkProvidersService,
    private inksService: InksService,
    public dialogRef: MatDialogRef<InkDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.inkProvidersService.getAll().subscribe(inkProviders => this.inkProviderList = inkProviders);
    this.inkFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        InkName: new FormControl('', Validators.required),
        InkCode: new FormControl('', Validators.required),
        InkProvider: new FormControl('', Validators.required),
      }
    );
    if (!isNullOrUndefined(this.data)) {
      this.selectedInk = this.data.ink;
      this.inkFormGroup.reset(this.selectedInk);
    }
  }

  formSubmit() {
    if (isNull(this.inkFormGroup.value.Id)) {
      this.inksService.addInk(this.inkFormGroup.value).subscribe(
        newUser => {
          this.dialogRef.close(newUser);
        }
      );
    } else {
      this.inksService.updateInk(this.inkFormGroup.value).subscribe(
        updatedUser => {
          this.dialogRef.close(updatedUser);
        }
      );
    }
  }

  restoreOnClick() {
    this.inkFormGroup.reset(this.selectedInk);
  }

  clearOnClick() {
    this.inkFormGroup.reset();
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
          this.inksService.deleteInk(this.selectedInk.Id).subscribe(
            () => {
              this.dialogRef.close(this.selectedInk.Id);
            }
          );
        }
      }
    );
  }

}
