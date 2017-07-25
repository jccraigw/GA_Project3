import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: 'products',
    component: StoreComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products/:id',
    component: DetailComponent
  },
   {
    path: 'orders',
    component: DetailComponent
  },
    {
    path: 'orders/cart',
    component: CartComponent
  },
    {
    path: 'checkout',
    component: CheckoutComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    LoginComponent,
    DetailComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
