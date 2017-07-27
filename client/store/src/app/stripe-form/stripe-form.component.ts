import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stripe-form',
  templateUrl: './stripe-form.component.html',
  styleUrls: ['./stripe-form.component.css']
})
export class StripeFormComponent{

  constructor() { }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_uOVzn2S0ha9lIfbrQQVftaeb',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });

  }

}
