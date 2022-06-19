import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageServicesService } from 'src/app/services/local-storage-services.service';
import { OrdersService } from 'src/app/services/orders.service';
import { BookInCart } from 'src/app/types/Book';
import { BookCate } from 'src/app/types/Category';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  booksItem: BookInCart[]
  invoice: any
  categories: BookCate[]
  
  constructor(
    private lsServices: LocalStorageServicesService,private categoryService: CategoryService, private orderServices: OrdersService
  ) {this.booksItem= [], this.categories = []; }

  ngOnInit(): void {
    this.onSetCart();
    this.getInvoice();
    this.getCategories();
  }
  getCategories() {
    return this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }
  getCategoryName(categoryId: string) {
    return this.categories.find(category => category._id === categoryId)?.name;
 }
  onSetCart() {
    this.booksItem = this.lsServices.getItem(); 
  }
  getInvoice() {
    this.invoice = this.lsServices.getInvoice();
  }
  getTotalPrice() {
    return this.booksItem.reduce((a, b) => a + b.quantity * b.price, 0);
  }
  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }
  exportPdf() {
    var element = document.getElementById('invoice');
  }
}
