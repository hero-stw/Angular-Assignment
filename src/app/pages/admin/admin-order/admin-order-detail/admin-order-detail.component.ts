import { Book } from './../../../../types/Book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/types/Order';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { BookCate } from 'src/app/types/Category';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  order: Order;
  id: string;
  categories: BookCate[];
  books: Book[];
  booksInOrder: any;
  constructor(
    private activateRoute: ActivatedRoute, 
    private orderServices: OrdersService, 
    private categoryService: CategoryService,
    private bookServices : BooksService) {
    this.id = '';
    this.order= {
      _id: '',
      products: [],
      price: 0,
      status: 'pending',
      shippingInfo: {
        fullname: '',
        address: '',
        phoneNumber: '',
        email: '',
        note:''
      }
    }
    this.categories = [];
    this.books = [];
    this.booksInOrder = [];
   }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['_id'];
    this.getBooks();
    this.orderServices.getOrder(this.id).subscribe(data => {
      this.order = data;
      this.booksInOrder = data.products.map(product => {
        return {
          info: this.books.find(book => book._id === product._id), 
          quantity: product.quantity
        };
      })
    })
    this.getCategories();
  }
  getBooks() {
    return this.bookServices.getBooks().subscribe(data => {
      this.books = data;
    })
  }
  getCategories() {
    return this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }
  getCategoryName(categoryId: string |undefined) {
    return this.categories.find(category => category._id === categoryId)?.name;
 }
  exportPdf(){
    
  }

}
