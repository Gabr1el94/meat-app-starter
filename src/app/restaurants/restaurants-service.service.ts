import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MEAT_API } from 'app/app.api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  //function for array restaurants
  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;
    if(search){
      params = new HttpParams().append('q', search);
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
  }

  // return one restaurant
  restaurantById(id: string): Observable<Restaurant>{
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  //All reviews of the restaurant
  reviewsOfRestaurant(id: string): Observable<any>{
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  //Menu itens of Restaurant
  menuOfRestaurant(id: string): Observable<MenuItem[]>{
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }

}
