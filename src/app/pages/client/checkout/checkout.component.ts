import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageServicesService } from 'src/app/services/local-storage-services.service';
import { BookCate } from 'src/app/types/Category';
import { BookInCart } from 'src/app/types/Book';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  booksItem: BookInCart[];
  categories: BookCate[];
  cartItemQty: number = 0;
  checkoutForm: FormGroup;
  constructor(private lsService: LocalStorageServicesService, private orderServices: OrdersService, private categoryService: CategoryService, private router: Router,) {
    this.booksItem= []
    this.categories = []
    this.checkoutForm = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})\\b')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      note: new FormControl('', [])
    })
   }

  ngOnInit(): void {
    this.onSetCart();
  }
  onSetCart() {
    this.booksItem = this.lsService.getItem(); 
  }
  getCategories() {
    return this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }
  getCategoryName(categoryId: string) {
    return this.categories.find(category => category._id === categoryId)?.name;
  }
  countNumberOfItemInCart() {
    return this.booksItem.reduce((a, b) => a + b.quantity, 0);
  }
  getTotalPrice() {
    return this.booksItem.reduce((a, b) => a + b.quantity * b.price, 0);
  }
  removeBookFromCart(id: string) {
    Swal.fire({
      title: 'Do you want to remove this book out of cart?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire(
          'Removed!',
          'Your book has been removed.',
          'success'
        )
        var targetBook = this.booksItem.find(book => book._id === id)
        targetBook && this.booksItem.splice(this.booksItem.indexOf(targetBook), 1);
        localStorage.setItem('cart', JSON.stringify(this.booksItem));
        this.cartItemQty = this.countNumberOfItemInCart();
      } else {
        Swal.fire(
          'Cancelled',
          'Your book is safe :)',
          'error'
        )
        this.cartItemQty = this.countNumberOfItemInCart();
      }
    })
    
  }
  onSubmit() {
    const submitData = this.checkoutForm.value;
    console.log(submitData);
    
    this.orderServices.createClientOrder({
      products: this.booksItem,
      price: this.getTotalPrice(),
      shippingInfo: this.checkoutForm.value,
      status: 'pending'
    }).subscribe((data) => {
      Swal.fire({
        icon: 'success',
        title: 'Create order successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // this.lsService.setInvoice();
        this.checkoutForm.reset();
      }).catch(err => {
        console.log(err);
      })
      this.lsService.setInvoice({
        ...data,
        shippingInfo: submitData
      });
      this.router.navigate(['/thank-you']);
    })
  }

}
