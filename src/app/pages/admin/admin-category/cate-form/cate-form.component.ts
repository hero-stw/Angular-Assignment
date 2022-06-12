import { Component, OnInit } from '@angular/core';
import { BookCate } from './../../../../types/Category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cate-form',
  templateUrl: './cate-form.component.html',
  styleUrls: ['./cate-form.component.css']
})
export class CateFormComponent implements OnInit {
  id: string;
  cateForm: FormGroup;
  cate: BookCate;

  constructor(
    private categoryService: CategoryService, 
    private activateRoute: ActivatedRoute, 
    private router: Router,
  ) {
    this.id = '';
    this.cate = {
      _id: '',
      name: '',
      status: 0
    }
    this.cateForm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      status : new FormControl('',[
        Validators.required,
      ])
    });
   }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['_id'];
    if(this.id) {
      this.categoryService.getCategory(this.id).subscribe(data => {
        this.cate = data;
        this.cateForm.patchValue({
          name: this.cate.name,
          status: this.cate.status
        });
      })
    }
  }
  getCategory() {
    return this.categoryService.getCategory(this.id).subscribe(data => {
      this.cate = data;
    })
  }

  onSubmit() {
    const submitData = this.cateForm.value;
    if (this.id === '' || this.id === undefined) {
      return this.categoryService.addCategory( {
        ...submitData,
        status: +submitData.status
      }).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Add category information successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(()=> {
          this.router.navigate(['/admin/category']);
        })
      })
    }
    return this.categoryService.updateCategory(this.id,{
      ...submitData,
      status: +submitData.status
    }).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Edit category information successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        this.router.navigate(['/admin/category']);
      })
    })
}
}
