import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'app/restaurants/restaurants-service.service';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private restaurantsService: RestaurantsService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(this.router.parent.snapshot.params['id']);
  }

  addMenuItem(item: MenuItem) {
    
  }
}
