import { Component, OnInit, Inject } from '@angular/core';
import { ClientDocument } from '../../../shared/models/client-document.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-client-document-preview-dialog',
  templateUrl: './client-document-preview-dialog.component.html',
  styles: []
})
export class ClientDocumentPreviewDialogComponent implements OnInit {

  selectedClientDocument: ClientDocument;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedClientDocument = this.data.clientDocument;
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
