import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/types/Book';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  books : Book[];

  constructor(
    private bookService: BooksService
  ) {
    this.books = []
   }

   getBooks() {
     this.bookService.getBooks().subscribe(data => {
       this.books = data;
      console.log(data);
      
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


  ngOnInit(): void {
    this.getBooks();
  }

}
