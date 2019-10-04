import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserDocumentsService } from '../../../../shared/services/user-documents.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-document-add-dialog',
  templateUrl: './user-document-add-dialog.component.html',
  styles: []
})
export class UserDocumentAddDialogComponent implements OnInit {

  userDocumentFormGroup: FormGroup;
  selectedUser: User;

  imgString = '';
  extension = '';

  constructor(
    private userDocumentsService: UserDocumentsService,
    public dialogRef: MatDialogRef<UserDocumentAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!isNullOrUndefined(this.data)) {
      this.selectedUser = this.data.user;
    }
    this.userDocumentFormGroup = new FormGroup(
      {
        Id: new FormControl(),
        User: new FormControl(this.selectedUser, Validators.required),
        FileData: new FormControl(''),
        Extension: new FormControl(''),
        Description: new FormControl('', Validators.required),
      }
    );
  }

  formSubmit() {
    this.userDocumentFormGroup.controls['Extension'].setValue(this.extension);
    this.userDocumentFormGroup.controls['FileData'].setValue(this.imgString);
    this.userDocumentsService
      .addUserDocument(this.userDocumentFormGroup.value)
      .subscribe(newUserDocument => this.dialogRef.close(newUserDocument));
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
