import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';
import { Book } from 'src/app/types/Book';
import { BookCate } from 'src/app/types/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  cates: BookCate[];
  booksInCate : Book[];
  books : Book[];
  constructor(
    private categoryService: CategoryService, 
    private bookService: BooksService,
  ) {
    this.cates = [];
    this.booksInCate = [];
    this.books = [];
  }
  getCategories() {
    return this.categoryService.getCategories().subscribe(data => {
      this.cates = data;
    })
  }
  getBooks() {
    return this.bookService.getBooks().subscribe(data => {
      this.books = data;
    })
  }
  getBooksInCate(cateId: string) {
    return this.booksInCate =  this.books.filter(book => book.category === cateId && book.status === 1);
  }
  getCategoryName(categoryId: string) {
    return this.cates.find(category => category._id === categoryId)?.name;
 }
  ngOnInit(): void {
    this.getCategories();
    this.getBooks();
  }

}
