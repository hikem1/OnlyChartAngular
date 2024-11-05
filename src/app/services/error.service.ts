import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessage = new Subject<string>();
  
  errorMessage$ = this.errorMessage.asObservable();

  showError(error: HttpErrorResponse) {
    let message = ""
    if(error.error instanceof ProgressEvent){
      message = error.statusText;
    }else{
      message = error.error
    }
    this.errorMessage.next(message);
  }
}
