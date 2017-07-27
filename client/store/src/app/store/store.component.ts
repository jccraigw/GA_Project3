import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Router } from '@angular/router'

class Product{

	id: number;
	name: string;
	price: number;
	color: string;
	size: string;
	image_url: string;
}


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent{

	products: Product[] = [];
	newProduct: Product = new Product();
	currentProduct: Product = new Product();
	showUploadForm: boolean = false;
	showEditForm: boolean = false;
  cart_num: number;
  search: string="";
   



  constructor(private http: Http, private router: Router) {
  		this.getProducts();

   }

   getProducts(){
   	
   	this.http.get('http://localhost:9393/products?token=' + window.localStorage.token).subscribe(response => {

   		this.products = response.json();
       this.cart_num = window.localStorage.cart_num;

   	}, err =>{

   		//if permission to page is denied
   		if(err.status === 403){

   			this.router.navigate(['/login'])

   		}else{

   			alert("ERROR");
   		}
   	})

   }

   postProduct(){

   		this.showUploadForm = false
   		this.http.post('http://localhost:9393/products?token=' + window.localStorage.token, this.newProduct).subscribe(response => {

   			this.products = response.json();
   		}, err =>{

   		//if permission to page is denied
   		if(err.status === 403){

   			this.router.navigate(['/login'])

   		}else{

   			alert("ERROR");
   		}
   	})

   }
   patchProduct(){

   		this.showEditForm = false
   		this.http.patch('http://localhost:9393/products/' + this.currentProduct.id + '?token=' + window.localStorage.token , this.currentProduct).subscribe(response =>{


   			this.products = response.json();
   		})

   }
   editProduct(product){

   	this.showEditForm = true;
   	this.currentProduct = Object.assign({}, product)


   }
   deleteProduct(product){

   		this.http.delete('http://localhost:9393/products/' + product.id + '?token=' + window.localStorage.token).subscribe(response => {

   				this.products = response.json();

   		})
   }
   goToProduct(product){
    this.router.navigate(['/products/', product.id])
  }
   login(){

     this.router.navigate(['/login'])

   }

   logout(){

   		window.localStorage.clear();
    	this.router.navigate(['/login'])
   }
   getCart(){

     this.router.navigate(['/orders/cart'])
   }

   searchProducts(){


     this.http.post('http://localhost:9393/products/search' + '?token=' + window.localStorage.token, {name: this.search}).subscribe(response =>{


         this.products = response.json();
     })
   }

 back(el) {
    el.scrollIntoView({ behavior: "smooth" });
}



 

}
