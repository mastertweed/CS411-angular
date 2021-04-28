import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/core/Services/user.service';
import { User } from 'src/app/Shared/Models/user.model';

import { UserInfoService } from "../../../core/Services/user_info.service";
import { UserInfo } from "../../../Shared/Models/userinfo.model";

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

  currentUser: User;

  currentUserInfo: UserInfo;
  private currentUserInfoSub: Subscription;

  constructor(public userinfoService: UserInfoService, 
    private userService: UserService, 
    private router: Router) {}

  ngOnInit(): void {

    // Revert to login page if no user logged in
    console.log(this.currentUser)
    this.currentUser = this.userService.getCurrentUser();
    console.log(this.currentUser)
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      
    } else {

      // Find user-info of user current logged in
      this.userinfoService.getUserInfoByEmail(this.currentUser.email)
      this.currentUserInfoSub = this.userinfoService.getUserInfoEmailUpdateListener()
      .subscribe((userinfo: UserInfo) => {
          this.currentUserInfo = userinfo;
          console.log(this.currentUser.email)
          console.log(this.currentUserInfo)
      });

    }

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
