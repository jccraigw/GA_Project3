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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{

		orders: Order[] = [];
		total: number;
    cart_num: number;


  constructor(private http: Http, private router: Router) {

  		this.getOrders();


  }



  getOrders(){


   	this.http.get('http://localhost:9393/orders/cart/' + window.localStorage.id_user + '?token=' + window.localStorage.token ).subscribe(response => {

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

  checkoutOrder(){

  	this.router.navigate(['/checkout'])
  }
    back(){

     this.router.navigate(['/products'])
   }

}
