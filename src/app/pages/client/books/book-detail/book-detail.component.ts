import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { LocalStorageServicesService } from 'src/app/services/local-storage-services.service';
import { Book } from 'src/app/types/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: string;
  cartQty: number;
  constructor(private bookService: BooksService, private activateRoute: ActivatedRoute, private lsService: LocalStorageServicesService) {
    this.id = '';
    this.book = {
      _id: '',
      title: '',
      price: 0,
      sale_price: 0,
      img: '',
      category: '',
      description: '',
    }
    this.cartQty = 0;
  } 

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['_id'];
    
    this.bookService.getBook(this.id).subscribe(data => {
      this.book = data;
      console.log(data);
    })
  }
  onChangeCartValue(event: any) {
    this.cartQty = event.target.value;
  }
  onAddToCart() {
    const addItem = {
      ...this.book,
      quantity: +this.cartQty
    };
    this.lsService.setItem(addItem);
    this.cartQty = 1;
  }
}
