import { BookDetailComponent } from './pages/client/books/book-detail/book-detail.component';
import { CartComponent } from './pages/client/cart/cart.component';
import { BooksComponent } from './pages/client/books/books.component';
import { HomepageComponent } from './pages/client/homepage/homepage.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminProductDetailComponent } from './pages/admin/admin-product/admin-product-detail/admin-product-detail.component';
import { AdminProductFormComponent } from './pages/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminProductListComponent } from './pages/admin/admin-product/admin-product-list/admin-product-list.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'books',
        children: [
          {
            path: '',
            component: BooksComponent,
          },
          {
            path: ':id',
            component: BookDetailComponent,
          }
        ]
      },
      {
        path: 'cart',
        component: CartComponent,
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            component: AdminProductListComponent,
          },
          {
            path: 'create',
            component: AdminProductFormComponent,
          },
          {
            path: 'edit/:id',
            component: AdminProductFormComponent,
          },
          {
            path: ':id',
            component: AdminProductDetailComponent,
          },
        ]
      },
      
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
