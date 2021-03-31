import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  firstname = "";
  lastname = "";
  city = "";
  state = "";
  zipcode = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitUserInfo(form: NgForm) {
    console.log("Submitted");
    if (form.invalid) {
      return;
    }
    this.firstname = form.value.firstname;
    this.lastname = form.value.lastname;
    this.city = form.value.city;
    this.state = form.value.state;
    this.zipcode = form.value.zipcode;
  }

}
