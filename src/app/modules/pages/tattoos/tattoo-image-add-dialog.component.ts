import { Component, OnInit, Inject } from '@angular/core';
import { Tattoo } from '../../../shared/models/tattoo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TattooImagesService } from '../../../shared/services/tattoo-images.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { isNullOrUndefined } from 'util';
import { CameraComponent } from '../../partials/camera/camera.component';

@Component({
  selector: 'app-tattoo-image-add-dialog',
  templateUrl: './tattoo-image-add-dialog.component.html',
  styles: []
})
export class TattooImageAddDialogComponent implements OnInit {

  tattooImageFormGroup: FormGroup;
  selectedTattoo: Tattoo;

  imgString = '';
  extension = '';

  previewExtension = '';
  previewImgString = '';

  constructor(
    private tattooImagesService: TattooImagesService,
    public dialogRef: MatDialogRef<TattooImageAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedTattoo = this.data.tattoo;
    }
    this.tattooImageFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        Tattoo: new FormControl(this.selectedTattoo, Validators.required),
        ImageData: new FormControl(''),
        Extension: new FormControl(''),
        Description: new FormControl('', Validators.required),
      }
    );
  }

  formSubmit() {
    this.tattooImageFormGroup.controls.Extension.setValue(this.previewExtension);
    this.tattooImageFormGroup.controls.ImageData.setValue(this.previewImgString);
    this.tattooImagesService
      .addTattooImage(this.tattooImageFormGroup.value)
      .subscribe(newTattooImage => this.dialogRef.close(newTattooImage));
  }

  inputFileChanged(e) {
    const files = e.target.files;
    const file = files[0];
    this.previewExtension = file.type;

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.previewImgString = btoa(binaryString);
  }

  photoButtonClicked() {
    const dialogRef = this.dialog.open(
      CameraComponent,
      {
        width: '800px',
        data: { tattoo: this.selectedTattoo }
      }
    );

    dialogRef.afterClosed().subscribe(
      cameraImage => {
        if (!isNullOrUndefined(cameraImage)) {
          this.previewExtension = cameraImage.extension;
          this.previewImgString = cameraImage.imageAsBase64;
        }
      }
    );
  }

}
