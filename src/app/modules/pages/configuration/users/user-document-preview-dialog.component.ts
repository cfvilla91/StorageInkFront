import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserDocument } from '../../../../shared/models/user-document.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-document-preview-dialog',
  templateUrl: './user-document-preview-dialog.component.html',
  styles: []
})
export class UserDocumentPreviewDialogComponent implements OnInit {

  selectedUserDocument: UserDocument;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedUserDocument = this.data.userDocument;
    }
  }

  supportedFormat(extension) {
    if (extension.match('image*')) {
      return true;
    } else {
      return false;
    }
  }

}
