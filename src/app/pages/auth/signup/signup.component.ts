import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.authService.signup(this.signupForm.value).subscribe(data => {
      localStorage.setItem('loggedInUser', JSON.stringify(data));
      this.router.navigateByUrl('/admin/');
      alert("Signup Successfully");
    });
  }

}
