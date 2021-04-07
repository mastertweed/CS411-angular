import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { UserInfoService } from "../../../core/Services/user_info.service";

@Component({
  selector: 'app-user-information-create',
  templateUrl: './user-information-create.component.html',
  styleUrls: ['./user-information-create.component.css']
})
export class UserInformationCreateComponent implements OnInit {

  email = "";
  firstname = "";
  lastname = "";
  city = "";
  state = "";
  zipcode = "";

  constructor(public userinfoService: UserInfoService) {}

  ngOnInit(): void {
  }

  onSubmitUserInfo(form: NgForm) {
    console.log("Submitted");
    if (form.invalid) {
      return;
    }
    this.email = form.value.email
    this.firstname = form.value.firstname;
    this.lastname = form.value.lastname;
    this.city = form.value.city;
    this.state = form.value.state;
    this.zipcode = form.value.zipcode;

    this.userinfoService.addUserInfo(this.email,this.firstname,this.lastname,this.city,this.state,this.zipcode)
  }

}
