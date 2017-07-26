import { Component, OnInit } from '@angular/core';
import {Http, Response } from '@angular/http'
import { Router } from '@angular/router'

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
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent{

	user = {};
	newUser: User = new User();

  constructor(private http: Http, private router: Router) {



  		this.http.get('http://localhost:9393/register').subscribe(response =>{

  				this.user = response.json();

  		})


   }

   postUser(){


   		this.http.post('http://localhost:9393/users/register', this.newUser).subscribe(response =>{

   				this.router.navigate(['/login'])

   		}, err =>{

   		//if permission to page is denied
   		if(err.status === 403){

   			this.router.navigate(['/login'])

   		}else{

   			alert("ERROR");
   		}
   	})
   }

  
}
