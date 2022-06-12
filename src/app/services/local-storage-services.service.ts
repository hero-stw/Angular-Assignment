import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BookInCart } from '../types/Book';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServicesService {
  private storageSubject = new Subject<string>();
  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }
  getItem() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  setItem(addItem:BookInCart) {

    const cartItems = this.getItem();

    const existItem = cartItems.find((item: BookInCart) =>
      item._id === addItem._id
    );
    if (!existItem) {
      cartItems.push(addItem);
    } else {
      existItem.quantity += addItem.quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.storageSubject.next('');
  }
  constructor() { }
}
