import { Component, OnInit } from '@angular/core';
import {Http, Response } from '@angular/http'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';

 class Order{

  id: number;
  name: string;
  price: number;
  color: string;
  size: string;
  image_url: string;
  id_users: number;
  id_products:number;
  quantity: number;
  id_carts: number;
}

class User{

  id: number;
  name: string;
  email: string;
  token: string;
  password_digest: string;
  street: string;
  street_pt_two: string;
  city: string;
  state: string;
  zip: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

	orders: Order[] = [];
	user: {};
	total: number;
	newShipping: User = new User();
	showEditForm: boolean = false;

  constructor(private http: Http, private router: Router) { 
  	this.getOrders();
  }

  getOrders(){
   	this.http.get('http://localhost:9393/orders/cart/' + window.localStorage.id_user + '/checkout?token=' + window.localStorage.token ).subscribe(response => {
   		this.orders = response.json().orders;
   		this.total = response.json().total;
   		this.user = response.json().user;
   	}, err =>{

   		//if permission to page is denied
   		if(err.status === 403){
   			this.router.navigate(['/login'])
   		}else{
   			alert("ERROR");
   		}
   	})
  }

  patchShipping(){
	  this.showEditForm = false
   	this.http.patch('http://localhost:9393/users/' + window.localStorage.id_user + '?token=' + window.localStorage.token, this.newShipping).subscribe(response =>{
   		this.user = response.json();
	  })
	}

	editShipping(user){
		this.showEditForm = true;
   	this.newShipping = Object.assign({}, user)
	}	

	
  deleteOrder(order){
  	this.http.delete('http://localhost:9393/orders/cart/' + order.id + '?token=' + window.localStorage.token).subscribe(response => {
  		this.orders = response.json().orders;
  		this.total = response.json().total;
      window.localStorage.setItem("cart_num", response.json().cart_num)
  	}, err =>{

   		//if permission to page is denied
   		if(err.status === 403){
   			this.router.navigate(['/login'])
   		}else{
   			alert("ERROR");
   		}
   	})
  }

  back(){
    this.router.navigate(['/products'])
  }
  
  openCheckout() {

    var self = this
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_uOVzn2S0ha9lIfbrQQVftaeb',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        self.http.post('http://localhost:9393/charges?token='+ window.localStorage.token, {"stripeToken": token.id}).subscribe(response =>{
          console.log("charged");
        })
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: this.total * 100
    });
  }
}
