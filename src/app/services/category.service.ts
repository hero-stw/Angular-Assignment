import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookCate } from '../types/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

  getCategories() : Observable<BookCate[]> {
    return this.http.get<BookCate[]>(environment.category);
  }

  getCategory(id: string) : Observable<BookCate> {
    return this.http.get<BookCate>(environment.category + '/' + id);
  }

  deleteCategory(id: string) : Observable<BookCate> {
    return this.http.delete<BookCate>(environment.category + '/' + id);
  }

  addCategory(category: BookCate) : Observable<BookCate> {
    return this.http.post<BookCate>(environment.category, category);
  }

  updateCategory(category: BookCate) : Observable<BookCate> {
    return this.http.put<BookCate>(environment.category + '/' + category._id, category);
  }

}
