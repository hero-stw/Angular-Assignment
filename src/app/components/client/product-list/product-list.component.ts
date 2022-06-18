import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { Book } from 'src/app/types/Book';
import { BookCate } from 'src/app/types/Category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  books : Book[];
  categories: BookCate[]

  constructor(
    private bookService: BooksService,
    private categoryService: CategoryService, 
  ) {
    this.books = []
    this.categories = [];
   }

   getBooks() {
     this.bookService.getBooks().subscribe(data => {
       this.books = data.filter(book => book.status === 0);;    
     })
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
          'Your file has been deleted.',
          'success'
        )
        this.bookService.deleteBook(id).subscribe(data => {
          this.getBooks();
        })
      }
    })
   }
  getCategories() {
    return this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }
  getCategoryName(categoryId: string) {
    return this.categories.find(category => category._id === categoryId)?.name;
 }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

}
