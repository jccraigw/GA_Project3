import { Component, OnInit } from '@angular/core';
import {Http, Response } from '@angular/http'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

class Product{

	id: number;
	name: string;
	price: number;
	color: string;
	size: string;
	image_url: string;
}

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
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

	product: Product = new Product();
  newOrder: Order = new Order();
  

  constructor(private route: ActivatedRoute, private http: Http,  private router: Router) {
  	let id = this.route.snapshot.params.id;
  	this.getProduct(id);
  }

  getProduct(id){

  	this.http.get('http://localhost:9393/products/' + id +'?token=' + window.localStorage.token).subscribe(response =>{

  		this.product = response.json();
  	})

  }

  orderProduct(product){

     this.newOrder.name = product.name;
     this.newOrder.id_users = window.localStorage.id_user * 1;
     this.newOrder.id_products = product.id;
     this.newOrder.quantity = this.newOrder.quantity *1;
     this.newOrder.price = product.price;
     this.newOrder.size = product.size;
     this.newOrder.color = product.color;
     this.newOrder.image_url = product.image_url;

     this.http.post('http://localhost:9393/orders?token=' + window.localStorage.token, this.newOrder).subscribe(response =>{


          this.router.navigate(['/orders/cart'])
    })

  }



}
