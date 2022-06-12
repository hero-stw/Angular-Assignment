import { Component, OnInit } from '@angular/core';
import { BookCate } from './../../../../types/Category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cate-list',
  templateUrl: './cate-list.component.html',
  styleUrls: ['./cate-list.component.css']
})
export class CateListComponent implements OnInit {
  categories: BookCate[];
  constructor(
    private categoryService: CategoryService
  ) { 
    this.categories = []
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
      console.log(data);
      
  })}
  deleteCate(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed && id) {
        Swal.fire(
          'Deleted!',
          'Your category has been deleted.',
          'success'
        )
        this.categoryService.deleteCategory(id).subscribe(data => {
          this.getCategories();
        })
      }
    })
   }
  onChange(event: string, id: string) {
    
    Swal.fire({
      title: 'Warning!!',
      text: "Do you want to change this category's status?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Changed!',
          'Your category"s status has been changed.',
          'success'
        )
        var targetCate = this.categories.find(category => category._id === id);
        targetCate && this.categoryService.updateCategory(id, {
          ...targetCate,
          status: +event
        }).subscribe(data => {
          this.getCategories();
        })
      }
    })
  }
  ngOnInit(): void {
    this.getCategories();
  }

}
