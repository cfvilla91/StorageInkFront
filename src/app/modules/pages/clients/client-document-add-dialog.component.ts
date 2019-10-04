import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../../../shared/models/client.model';
import { ClientDocumentsService } from '../../../shared/services/client-documents.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-client-document-add-dialog',
  templateUrl: './client-document-add-dialog.component.html',
  styles: []
})
export class ClientDocumentAddDialogComponent implements OnInit {

  clientDocumentFormGroup: FormGroup;
  selectedClient: Client;

  imgString = '';
  extension = '';

  constructor(
    private clientDocumentsService: ClientDocumentsService,
    public dialogRef: MatDialogRef<ClientDocumentAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedClient = this.data.client;
    }
    this.clientDocumentFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        Client: new FormControl(this.selectedClient, Validators.required),
        FileData: new FormControl(''),
        Extension: new FormControl(''),
        Description: new FormControl('', Validators.required),
      }
    );
  }

  formSubmit() {
    this.clientDocumentFormGroup.controls['Extension'].setValue(this.extension);
    this.clientDocumentFormGroup.controls['FileData'].setValue(this.imgString);
    this.clientDocumentsService
      .addClientDocument(this.clientDocumentFormGroup.value)
      .subscribe(newClientDocument => this.dialogRef.close(newClientDocument));
  }

  inputFileChanged(e) {
    const files = e.target.files;
    const file = files[0];
    this.extension = file.type;

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
    console.log(e.target.files);
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.imgString = btoa(binaryString);
  }

}
