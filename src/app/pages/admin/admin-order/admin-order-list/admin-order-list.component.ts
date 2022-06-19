import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Book } from 'src/app/types/Book';
import { BookCate } from 'src/app/types/Category';
import { Order } from 'src/app/types/Order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit {
  orders: Order[];
  books : Book[];
  categories: BookCate[];
  constructor(
    private bookService: BooksService,
    private categoryService: CategoryService,
    private orderService: OrdersService
  ) {
    this.orders = []
    this.books = []
    this.categories = []
  }

  getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      console.log(data);
    })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
      console.log(data);
      
  })}

  getCategoryName(categoryId: string) {
     return this.categories.find(category => category._id === categoryId)?.name;
  }
  onChange(event: string, id: string | undefined) {
    
    Swal.fire({
      title: 'Warning!!',
      text: "Do you want to change this order's status?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Changed!',
          'Your order"s status has been changed.',
          'success'
        )
        var targetOrder = this.orders.find(order => order._id === id);
        targetOrder && this.orderService.updateOrderStatus(id, event).subscribe(data => {
          this.getOrders();
        })
      }
    })
  }

  ngOnInit(): void {
    this.getOrders();
  }

}
