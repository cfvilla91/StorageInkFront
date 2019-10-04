import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { LoaderService } from '../loader/loader.service';
@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  private requestCount = 0;

  constructor(
    // private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    },
      (err: any) => {
        this.onEnd();
      }));
  }
  private onEnd(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.hideLoader();
    }
  }
  private showLoader(): void {
    if (this.requestCount < 0) {
      this.requestCount = 0;
    }
    this.requestCount++;
    // this.loaderService.show();
  }
  private hideLoader(): void {
    // this.loaderService.hide();
  }
}
