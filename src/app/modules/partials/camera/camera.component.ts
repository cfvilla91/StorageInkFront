import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamUtil, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  public multipleWebcamsAvailable = false;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  public errors: WebcamInitError[] = [];

  constructor(
    public dialogRef: MatDialogRef<CameraComponent>,
  ) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.dialogRef.close({ imageAsBase64: this.webcamImage.imageAsBase64, extension: 'image/jpeg' });
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
    this.errors.push(error);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


}
