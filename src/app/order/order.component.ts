import { Component, OnInit } from '@angular/core';
import { RadioOptions } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/do';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  delivery: number = 8;

  orderId: string;

  paymentOptions: RadioOptions[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'},
  ];

  constructor(private orderService: OrderService, 
              private router: Router, 
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('',[Validators.required,Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      number:this.formBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('',[Validators.required])
    },{validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
        return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNoMatch: true}
    }

    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems()
    .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    this.orderService.checkOrder(order)
    .do((orderId: string) => {
      this.orderId = orderId
    })
    .subscribe((orderId: string )=> {
      this.router.navigate(['/order-summary']);
      this.orderService.clear();
    });
  }

  isOrderCompleted():boolean {
    return this.orderId !== undefined;
  }

}
