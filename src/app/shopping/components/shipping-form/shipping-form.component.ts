import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {

  @Input('cart') cart:ShoppingCart;
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  subscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authServeice: AuthService) {}
  
  async ngOnInit() {
    this.subscription = this.authServeice.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }   

}
