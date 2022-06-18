import { BookCate } from './../../../../types/Category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/types/Book';
import { BooksService } from 'src/app/services/books.service';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {

  book: Book;
  id: string;
  productForm: FormGroup;
  categories: BookCate[]


  constructor(
    private bookService: BooksService,
    private categoryService: CategoryService, 
    private activateRoute: ActivatedRoute, 
    private router: Router,
    ) 
    {
    this.id = '';
    this.categories = [];
    this.book = {
      _id: '',
      title: '',
      price: 0,
      sale_price: 0,
      img: '',
      category: '',
      description: '',
      status: 0
    }
    this.productForm = new FormGroup({
      title: new FormControl('', 
      [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      price: new FormControl('',
      [
        Validators.required,
        Validators.min(0)
      ]),
      sale_price: new FormControl('',
      [
        Validators.min(0),
      ]),
      img: new FormControl('',
      [
        // Validators.required,
      ]),
      category: new FormControl('',[

      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]),
      status: new FormControl('',[
        Validators.required,
      ])
    })
   }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['_id'];
    
    this.bookService.getBook(this.id).subscribe(data => {
      this.book = data;
      this.productForm.patchValue({
        title: this.book.title,
        price: this.book.price,
        sale_price: this.book.sale_price,
        img: this.book.img,
        category: this.book.category,
        description: this.book.description,
        status: this.book.status

      })
      
    })
    this.getCategories();
  }
  getCategories() {
    return this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  onSubmit() {
    const submitData = this.productForm.value;

    if (this.id === '' || this.id === undefined) {
      return this.bookService.addBook( {
        ...submitData,
        status : +submitData.status,
        img: submitData.img || this.book.img
      }).subscribe(data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Add book information successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(()=> {
          this.router.navigate(['/admin/books']);
        })
      })
    }

    return this.bookService.updateBook(this.id,{
      ...submitData,
      status : +submitData.status  
    }).subscribe(data => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Edit new book successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        this.router.navigate(['/admin/books']);
      })
    })
  } 

  uploadHandler(event: any) {
    if (event.target.files[0] && event.target.files.length) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fckljd3m");

    axios({
        url: "https://api.cloudinary.com/v1_1/ecma-assignment/image/upload",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-formendcoded",
        },
        data: formData,
    }).then((res) => {
        this.book.img = res.data.secure_url;
        this.productForm.patchValue({
          img: this.book.img
        })
    });
  }
}
}
