import { BookCate } from './../../../types/Category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageServicesService } from 'src/app/services/local-storage-services.service';
import { BookInCart } from 'src/app/types/Book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  booksItem: BookInCart[];
  categories: BookCate[];
  cartItemQty: number = 0;
  constructor(private lsService: LocalStorageServicesService, private categoryService: CategoryService
    ) {
    this.booksItem= [],
    this.categories = []
   }

  ngOnInit(): void {
    this.onSetCart();
    this.getCategories();
  }
  onSetCart() {
    this.booksItem = this.lsService.getItem(); 
    this.cartItemQty = this.booksItem.reduce((a, b) => a + b.quantity, 0);
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
      
  })}
  getCategoryName(categoryId: string) {
    return this.categories.find(category => category._id === categoryId)?.name;
  }
  countNumberOfItemInCart() {
    return this.booksItem.reduce((a, b) => a + b.quantity, 0);
  }

  getTotalPrice() {
    return this.booksItem.reduce((a, b) => a + b.quantity * b.price, 0);
  }
  

}
