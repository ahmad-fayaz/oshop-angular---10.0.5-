import { switchMap } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap(user => this.orderService.getOrdersByUser(user.uid)),
    );
    
  }

}
