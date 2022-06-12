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

  constructor(
    private categoryService: CategoryService, 
    private activateRoute: ActivatedRoute, 
    private router: Router,
  ) {
    this.id = '';
    this.cate = {
      
    }
    this.cateForm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
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
      this.categoryService.getCateById(this.id).subscribe(data => {
        this.
        this.cateForm.patchValue(data);
      })
    }
  }

}
