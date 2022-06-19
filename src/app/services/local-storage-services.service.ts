import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book, BookInCart } from '../types/Book';

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
  countNumberOfItemInCart() {
    return this.getItem().reduce((a:any, b:any) => a + b.quantity, 0);
  }
  increaseQuantityOfBookInCart(id: string) {
    var targetBook = this.getItem().find((book:any) => book._id === id)
    targetBook && targetBook.quantity++;
   this.setItem(targetBook);
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
  setInvoice(invoice: any) {
    localStorage.setItem('invoice', JSON.stringify(invoice));
  }
  getInvoice(){
    return JSON.parse(localStorage.getItem('invoice') || '[]');
  }
  constructor() { }
}
