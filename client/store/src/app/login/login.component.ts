import { Component, OnInit } from '@angular/core';
import {Http, Response } from '@angular/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

	user = {};

  constructor(private http: Http, private router: Router) {}

  login(){
    this.http.post('http://localhost:9393/users/login', this.user).subscribe(response => {
      window.localStorage.setItem("token",response.json().token)
      window.localStorage.setItem("id_user", response.json().id)
      this.router.navigate(['/products'])
    })
  }

  goToJoin(){
    this.router.navigate(['/register'])
  }
  
  back(){
    this.router.navigate(['/login'])
  } 
}
