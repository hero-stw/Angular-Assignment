import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  userEmail : any;
  constructor() {
    this.userEmail = '';
  }

  getUserEmail() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      this.userEmail = JSON.parse(loggedInUser).user.email;
      
    }
  }

  ngOnInit(): void {
    this.getUserEmail();
  }

}
