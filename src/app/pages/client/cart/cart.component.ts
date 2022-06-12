import { Component, OnInit } from '@angular/core';
import { LocalStorageServicesService } from 'src/app/services/local-storage-services.service';
import { BookInCart } from 'src/app/types/Book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  booksItem: BookInCart[];
  cartItemQty: number = 0;
  constructor(private lsService: LocalStorageServicesService) {
    this.booksItem= []
   }

  ngOnInit(): void {
    this.onSetCart();
  }
  onSetCart() {
    this.booksItem = this.lsService.getItem();
    console.log(this.booksItem);
    
    this.cartItemQty = this.booksItem.reduce((a, b) => a + b.quantity, 0);
  }

}
