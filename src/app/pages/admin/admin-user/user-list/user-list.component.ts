import  Swal  from 'sweetalert2';
import { User } from 'src/app/types/User';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageServicesService } from 'src/app/services/local-storage-services.service';
import { TypeLoginResponse } from 'src/app/types/Auth';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  currentUser: TypeLoginResponse;
  constructor(
    private userService: UserService,
    private lsService: LocalStorageServicesService
  ) { 
    this.users = [],
    this.currentUser = {
      accessToken: '',
      user: {
        email: ''
      }
    }
  }
  
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data
      console.log(data);
  })}

  getUserEmailById(id: string) { 
    var targetUser = this.users.find(user => user._id === id);
    return targetUser && targetUser.email;
  }

  deleteUser(id: string) {
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
        if (this.currentUser.user.email === this.getUserEmailById(id)) {
          Swal.fire(
            'Error!',
            'You can not delete your own account',
            'error'
          )
        } else {
          Swal.fire(
            'Deleted!',
            'Your user has been deleted.',
            'success'
          )
          this.userService.deleteUser(id).subscribe(data => {
            this.getUsers();
          })
        }
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
          var targetUser = this.users.find(user => user._id === id);
          targetUser && this.userService.updateUser(id, {
            ...targetUser,
            role: +event
          }).subscribe(data => {
            this.getUsers();
          })
        }
      })
    }

  ngOnInit(): void {
    this.getUsers();
  }

}
