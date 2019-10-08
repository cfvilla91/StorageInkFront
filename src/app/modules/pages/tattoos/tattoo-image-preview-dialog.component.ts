import { Component, OnInit, Inject } from '@angular/core';
import { TattooImage } from '../../../shared/models/tattoo-image.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tattoo-image-preview-dialog',
  templateUrl: './tattoo-image-preview-dialog.component.html',
  styles: []
})
export class TattooImagePreviewDialogComponent implements OnInit {

  selectedTattooImage: TattooImage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedTattooImage = this.data.tattooImage;
      console.log(this.selectedTattooImage);
    }
  }

}
