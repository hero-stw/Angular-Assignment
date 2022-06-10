import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { ClientHeaderComponent } from './components/client/client-header/client-header.component';
import { ClientFooterComponent } from './components/client/client-footer/client-footer.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminProductListComponent } from './pages/admin/admin-product/admin-product-list/admin-product-list.component';
import { AdminProductFormComponent } from './pages/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductDetailComponent } from './pages/admin/admin-product/admin-product-detail/admin-product-detail.component';
import { HomepageComponent } from './pages/client/homepage/homepage.component';
import { BooksComponent } from './pages/client/books/books.component';
import { CartComponent } from './pages/client/cart/cart.component';
import { BookDetailComponent } from './pages/client/books/book-detail/book-detail.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ProductListComponent } from './components/client/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    AdminSidebarComponent,
    AdminProductListComponent,
    AdminProductFormComponent,
    AdminProductDetailComponent,
    HomepageComponent,
    BooksComponent,
    CartComponent,
    BookDetailComponent,
    SigninComponent,
    SignupComponent,
    AuthLayoutComponent,
    ProductListComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
