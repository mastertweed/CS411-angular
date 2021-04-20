import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signup = 0

  loginEmail = "";
  loginPassword = "";
  signupEmail = "";
  signupPassword = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onSubmitLogin(form: NgForm) {
    console.log("Submitted login")
    if (form.invalid) {
      return;
    }
    this.loginEmail = form.value.loginEmail
    this.loginPassword = form.value.loginPassword

    this.router.navigate(['/user-info']);
  }

  onSubmitSignup(form: NgForm) {
    console.log("Submitted signup")
    if (form.invalid) {
      return;
    }
    this.signupEmail = form.value.signupEmail
    this.signupPassword = form.value.signupPassword

    this.router.navigate(['/user-info']);
  }

  onGuestClick() {
    this.router.navigate(['/preference']);
  }
  

}
