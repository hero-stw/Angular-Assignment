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
import { AdminVerifyGuard } from './guards/admin-verify.guard';
import { CateListComponent } from './pages/admin/admin-category/cate-list/cate-list.component';
import { CateFormComponent } from './pages/admin/admin-category/cate-form/cate-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [AdminVerifyGuard],
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
            path: ':_id',
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
        path: 'books',
        children: [
          {
            path: '',
            component: AdminProductListComponent,
          },
          {
            path: 'create',
            component: AdminProductFormComponent,
          },
          // {
          //   path: 'edit/:id',
          //   component: AdminProductFormComponent,
          // },
          {
            path: ':_id',
            component: AdminProductFormComponent,
          },
        ]
      },
      {
        path: 'category',
        children: [
          {
            path: '',
            component: CateListComponent,
          },
          {
            path: 'create',
            component: CateFormComponent
          },
          {
            path: ':_id',
            component: CateFormComponent
          }
        ]
      }
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
  },
  {
    path: 'cart',
    component: CartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminVerifyGuard]
})
export class AppRoutingModule { }
