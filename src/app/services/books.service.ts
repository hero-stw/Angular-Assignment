import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../types/Book';
import { environment } from 'src/environments/environment';
import { BookCate } from '../types/Category';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { 

  }
  getBooks():Observable<Book[]> {
    return this.http.get<Book[]>(environment.books);

  }
  getBook(id: string):Observable<Book> {
    return this.http.get<Book>(`${environment.books}/${id}`);
  }
  // getBooksByCategory(category: string):Observable<Book[]> {
  //   return this.http.get<Book[]>(environment.books + '?category=' + category);
  // }
  getCategory(id: string) : Observable<BookCate> {
    return this.http.get<BookCate>(environment.category + '/' + id);
  }
  deleteBook(id: string):Observable<Book> {
    return this.http.delete<Book>(environment.books + '/' + id);
  }
  addBook(book: Book):Observable<Book> {
    return this.http.post<Book>(environment.books, book);
  }
  updateBook(id: string, book: Book):Observable<Book> {
    return this.http.put<Book>(environment.books + '/' + id, book);
  }
}
