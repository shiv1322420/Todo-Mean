import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showSuccess(message: string) {
    Toastify({
      text: message,
      duration: 3000,
      backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)'
    }).showToast();
  }

  showError(message: string) {
    Toastify({
      text: message,
      duration: 3000,
      backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)'
    }).showToast();
  }
}
