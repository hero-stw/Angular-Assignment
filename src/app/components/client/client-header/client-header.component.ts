import { Component, OnInit } from '@angular/core';
import { LocalStorageServicesService } from 'src/app/services/local-storage-services.service';
import { BookInCart } from 'src/app/types/Book';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {
  booksItem: BookInCart[];
  cartItemQty: number = 0;
  constructor(
    private lsService: LocalStorageServicesService
  ) {
    this.booksItem= []
   }
   onSetCart() {
    this.booksItem = this.lsService.getItem(); 
  }
  ngOnInit(): void {
    this.onSetCart();
  }
  countNumberOfItemInCart() {
    return this.lsService.countNumberOfItemInCart();
  }

  
}
