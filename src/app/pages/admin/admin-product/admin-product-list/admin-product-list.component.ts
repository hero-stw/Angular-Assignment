import { BookCate } from './../../../../types/Category';
import { CategoryService } from 'src/app/services/category.service';

import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/Book';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {

  books : Book[];
  categories: BookCate[];

  constructor(
    private bookService: BooksService,
    private categoryService: CategoryService
  ) {
    this.books = []
    this.categories = []
   }

   getBooks() {
     this.bookService.getBooks().subscribe(data => {
       this.books = data;
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
   deleteBook(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed && id) {
        Swal.fire(
          'Deleted!',
          'Your book has been deleted.',
          'success'
        )
        this.bookService.deleteBook(id).subscribe(data => {
          this.getBooks();
        })
      }
    })
   }
   onChange(event: string, id: string) {
    
    Swal.fire({
      title: 'Warning!!',
      text: "Do you want to change this book's status?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Changed!',
          'Your book"s status has been changed.',
          'success'
        )
        var targetBook = this.books.find(book => book._id === id);
        targetBook && this.bookService.updateBook(id, {
          ...targetBook,
          status: +event
        }).subscribe(data => {
          this.getBooks();
        })
      }
    })
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

}
