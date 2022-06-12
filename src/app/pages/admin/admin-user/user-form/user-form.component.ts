import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id: string;
  userForm: FormGroup;
  user: User;
  
  constructor(
    private activateRoute: ActivatedRoute, 
    private router: Router,
    private userService: UserService
  ) {
    this.id = '';
    this.user = {
      _id: '',
      email: '',
      password: '',
      role: 0
    }
    this.userForm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
      ]),
      role: new FormControl('',[
        Validators.required,
      ])
    })
   }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['_id'];
    if(this.id) {
      this.userService.getUser(this.id).subscribe(data => {
        this.user = data;
        this.userForm.patchValue({
          email: this.user.email,
          role: this.user.role,
        });
      })
    }
  }

  onSubmit() {
    const submitData = this.userForm.value;
    if (this.id === '' || this.id === undefined) {
      return this.userService.addUser( {
        ...submitData,
        role: +submitData.role
      }).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Add user information successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(()=> {
          this.router.navigate(['/admin/users']);
        })
      })
    }
    return this.userService.updateUser(this.id,{
      ...submitData,
      role: +submitData.role
    }).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Edit user information successfully',
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        this.router.navigate(['/admin/users']);
      })
    })
  }

}
