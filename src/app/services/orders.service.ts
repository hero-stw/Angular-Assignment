import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../types/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders():Observable<Order[]> {
    return this.http.get<Order[]>(environment.orders);
  }
  getOrder(id: string):Observable<Order> {
    return this.http.get<Order>(`${environment.orders}/${id}`);
  }
  deleteOrder(id: string):Observable<Order> {
    return this.http.delete<Order>(environment.orders + '/' + id);
  }
  createClientOrder(order: Order):Observable<Order> {
    return this.http.post<Order>(environment.orders + '/client-order', order);
  }
  updateOrderStatus(id: string |undefined, status: string):Observable<Order> {
    return this.http.put<Order>(environment.orders + '/update-status/' + id, { status });
  }
}
