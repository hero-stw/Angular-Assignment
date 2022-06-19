import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/types/Book';
import { BooksService } from 'src/app/services/books.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit {
  book: Book;
  id: string;

  constructor(private bookService: BooksService, private activateRoute: ActivatedRoute) {
    this.id = '';
    this.book = {
      _id: '',
      title: '',
      price: 0,
      sale_price: 0,
      img: '',
      category: '',
      description: '',

      status: 0
    }
   }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['_id'];
    
    this.bookService.getBook(this.id).subscribe(data => {
      this.book = data;
      console.log(data);
    })
  }
  

}
