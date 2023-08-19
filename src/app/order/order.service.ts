import { Injectable } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { Order } from './order.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Headers, Http, RequestOptions } from '@angular/http';
import { MEAT_API } from 'app/app.api';

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: Http) { }

  itemsValue():number{
    return this.cartService.totalizacao();
  }

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  increaseQty(item: CartItem){
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.cartService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item)
  }

  checkOrder(order: Order): Observable<string>{
    const headers = new Headers();
    headers.append('Content-Type','application/json')
    return this.http.post(`${MEAT_API}/orders`, 
          JSON.stringify(order), 
          new RequestOptions({headers: headers}))
          .map(response => response.json())
          .map(order => order.id);
  }

  clear() {
    this.cartService.clear();
  }

}
