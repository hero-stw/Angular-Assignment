import { CheckoutComponent } from './pages/client/checkout/checkout.component';
import { UserFormComponent } from './pages/admin/admin-user/user-form/user-form.component';
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
import { UserListComponent } from './pages/admin/admin-user/user-list/user-list.component';
import { ThankYouComponent } from './pages/client/thank-you/thank-you.component';
import { AdminOrderListComponent } from './pages/admin/admin-order/admin-order-list/admin-order-list.component';
import { AdminOrderDetailComponent } from './pages/admin/admin-order/admin-order-detail/admin-order-detail.component';

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
            path: ':_id',
            component: BookDetailComponent,
          }
        ]
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'thank-you',
        component: ThankYouComponent
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminVerifyGuard],
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
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UserListComponent
          },
          {
            path: 'create',
            component: UserFormComponent
          },
          {
            path: ':_id',
            component: UserFormComponent
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            component: AdminOrderListComponent
          },
          {
            path: ':_id',
            component: AdminOrderDetailComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminVerifyGuard]
})
export class AppRoutingModule { }
