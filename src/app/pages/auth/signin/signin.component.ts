import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router

  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem('loggedInUser', JSON.stringify(data));
      this.router.navigateByUrl('/admin/books');
    });
  }

}
