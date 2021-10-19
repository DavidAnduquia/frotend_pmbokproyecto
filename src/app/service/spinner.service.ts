import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService:NgxSpinnerService) { }

  public callSpiner(){
    this.spinnerService.show();
  }

  public stopSpiner(){
    this.spinnerService.hide();
  }
}
